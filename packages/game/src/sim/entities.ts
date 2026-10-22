// Simulation entities. Plain classes with public fields: systems mutate them
// directly each tick; replication reads them. No I/O lives here.

import {
  ECHO_SURGE_THRESHOLD,
  STATE,
  WARDEN,
  type CharacterData,
  type DerivedStats,
  type EliteAffixId,
  type EntityKind,
  type EntitySpawn,
  type EntityUpdate,
  type Item,
  type MonsterAbility,
  type MonsterDef,
  type SkillSlot,
  type StatusDef,
  type Vec2,
} from '../bridge.js';

export type Faction = 'players' | 'monsters';

export interface Dot {
  dps: number;
  left: number;
  srcId: number;
  kind: 'bleed' | 'burn' | 'pool';
}

export interface ActiveBuff {
  id: string;
  name: string;
  left: number;
  damagePct: number;
  damageReduction: number;
  moveSpeedPct: number;
  attackSpeedPct: number;
  immune: boolean;
  regenPct: number;
}

export interface ForcedMove {
  vx: number;
  vy: number;
  left: number;
  /** Damage dealt to each enemy touched along the way (once per enemy). */
  hit?: { coef?: number; flat?: number; radius: number; applies?: StatusDef; hitIds: Set<number> };
  visual?: string;
  slot?: SkillSlot;
}

export abstract class Entity {
  abstract readonly kind: EntityKind;
  /** Tick on which a replicated field last changed; replication sends updates only for these. */
  changedTick = 0;
  removed = false;

  constructor(
    public readonly id: number,
    public pos: Vec2,
    public radius: number,
  ) {}

  abstract spawnInfo(): EntitySpawn;

  update(): EntityUpdate | null {
    return null;
  }

  /** Only replicate to this player? (personal loot). */
  visibleTo(_playerId: number): boolean {
    return true;
  }
}

export abstract class Unit extends Entity {
  hp = 1;
  maxHp = 1;
  facing = 0;
  dead = false;
  faction: Faction = 'monsters';
  slowPct = 0;
  slowLeft = 0;
  stunLeft = 0;
  vulnerablePct = 0;
  vulnerableLeft = 0;
  dots: Dot[] = [];
  forced: ForcedMove | null = null;

  get slowMult(): number {
    return this.slowLeft > 0 ? 1 - this.slowPct : 1;
  }

  protected baseStateBits(): number {
    let s = 0;
    if (this.dead) s |= STATE.dead;
    if (this.stunLeft > 0) s |= STATE.stunned;
    if (this.slowLeft > 0) s |= STATE.slowed;
    if (this.dots.length) s |= STATE.dot;
    return s;
  }

  stateBits(): number {
    return this.baseStateBits();
  }

  override update(): EntityUpdate {
    return [
      this.id,
      Math.round(this.pos.x * 100),
      Math.round(this.pos.y * 100),
      Math.round((this.hp / this.maxHp) * 1000),
      Math.round(this.facing * 100),
      this.stateBits(),
    ];
  }
}

export interface PlayerInput {
  seq: number;
  mx: number;
  my: number;
  ax: number;
  ay: number;
  buttons: number;
  /** Soft-lock target. 0 is none. The sim drops it when the target dies or the stick turns away. */
  lock: number;
}

export class Player extends Unit {
  readonly kind = 'player' as const;
  override faction: Faction = 'players';
  input: PlayerInput = { seq: 0, mx: 0, my: 0, ax: 0, ay: 0, buttons: 0, lock: 0 };
  /** Last input sequence the simulation applied (acked back for client reconciliation). */
  ackSeq = 0;
  resource = 0;
  cooldowns: Record<SkillSlot, number> = { main: 0, a0: 0, a1: 0, a2: 0 };
  prevButtons = 0;
  /** Enemy the stick is holding. Cleared by the sim, not only by the client. */
  lockId = 0;
  castLock = 0;
  potionCd = 0;
  respawnLeft = 0;
  buffs: ActiveBuff[] = [];
  procCds = new Map<string, number>();
  lastCombat = -999;
  massacreCount = 0;
  massacreTimer = 0;
  pets = new Set<number>();
  charDirty = true;
  regenCarry = 0;

  constructor(
    id: number,
    pos: Vec2,
    public readonly accountName: string,
    public char: CharacterData,
    public stats: DerivedStats,
    public partyId: string | null,
  ) {
    super(id, pos, 0.42);
    this.maxHp = stats.maxLife;
    this.hp = stats.maxLife;
    this.resource = 0;
  }

  get resourceDef() {
    return WARDEN.resource;
  }

  get surging(): boolean {
    return this.resource >= ECHO_SURGE_THRESHOLD;
  }

  buffSum(key: 'damagePct' | 'damageReduction' | 'moveSpeedPct' | 'attackSpeedPct' | 'regenPct'): number {
    let s = 0;
    for (const b of this.buffs) s += b[key];
    return s;
  }

  get immune(): boolean {
    return this.buffs.some((b) => b.immune);
  }

  get moveSpeed(): number {
    return this.stats.moveSpeed * (1 + this.buffSum('moveSpeedPct')) * this.slowMult;
  }

  override stateBits(): number {
    let s = this.baseStateBits();
    if (this.immune) s |= STATE.immune;
    if (this.surging) s |= STATE.surge;
    if (this.buffSum('damageReduction') > 0) s |= STATE.shielded;
    if (this.castLock > 0) s |= STATE.winding;
    return s;
  }

  spawnInfo(): EntitySpawn {
    return {
      id: this.id,
      k: 'player',
      x: this.pos.x,
      y: this.pos.y,
      r: this.radius,
      name: this.char.boardName || 'Warden',
      level: this.char.level,
    };
  }
}

export type EliteTier = 'normal' | 'champion' | 'rare' | 'minion' | 'boss';

export interface Windup {
  ability: MonsterAbility;
  index: number;
  left: number;
  target: Vec2;
}

export class Monster extends Unit {
  readonly kind: 'monster' | 'pet';
  abilities: MonsterAbility[];
  abilityCds: number[];
  windup: Windup | null = null;
  targetId = 0;
  aggro = false;
  aggroAt = 0;
  speedMult = 1;
  attackSpeedMult = 1;
  damageTakenMult = 1;
  dormant = true;
  expiresAt = Infinity;
  ownerId = 0;
  name: string;
  phase = 1;
  strafeDir = 1;
  /** Summoned adds grant no loot, XP or echo. */
  noReward = false;
  /** Players who damaged this monster (for kill credit). */
  hitBy = new Set<number>();

  constructor(
    id: number,
    pos: Vec2,
    public readonly def: MonsterDef,
    public level: number,
    public damage: number,
    public tier: EliteTier,
    public affixes: EliteAffixId[],
    extraAbilities: MonsterAbility[],
  ) {
    super(id, pos, def.radius * (tier === 'champion' || tier === 'rare' ? 1.2 : 1));
    this.kind = def.ai === 'pet' ? 'pet' : 'monster';
    this.abilities = [...def.abilities, ...extraAbilities];
    this.abilityCds = this.abilities.map((a, i) => (a.kind === 'melee' ? 0 : a.cooldown * (0.4 + 0.15 * i)));
    this.name = def.name;
    if (def.ai === 'pet') this.faction = 'players';
  }

  override stateBits(): number {
    let s = this.baseStateBits();
    if (this.windup) s |= STATE.winding;
    return s;
  }

  spawnInfo(): EntitySpawn {
    return {
      id: this.id,
      k: this.kind,
      x: this.pos.x,
      y: this.pos.y,
      r: this.radius,
      name: this.name,
      monsterId: this.def.id,
      level: this.level,
      elite: this.tier === 'normal' ? undefined : this.tier,
      affixes: this.affixes.length ? this.affixes : undefined,
      ownerId: this.ownerId || undefined,
    };
  }
}

export class Projectile extends Entity {
  readonly kind = 'projectile' as const;
  hitIds = new Set<number>();

  constructor(
    id: number,
    pos: Vec2,
    radius: number,
    public vel: Vec2,
    public rangeLeft: number,
    public faction: Faction,
    public ownerId: number,
    public visual: string,
    /** Player projectiles carry a weapon-damage coefficient; monster ones a flat amount. */
    public coef: number,
    public flat: number,
    public pierce: number,
    public explodeRadius: number,
    public applies: StatusDef | undefined,
    public skillSlot: SkillSlot | null,
    public echoOnHit = 0,
  ) {
    super(id, pos, radius);
  }

  spawnInfo(): EntitySpawn {
    return { id: this.id, k: 'projectile', x: this.pos.x, y: this.pos.y, r: this.radius, visual: this.visual, vx: this.vel.x, vy: this.vel.y };
  }
}

export class GroundZone extends Entity {
  readonly kind = 'zone' as const;
  tickTimer = 0;

  constructor(
    id: number,
    pos: Vec2,
    radius: number,
    public left: number,
    public faction: Faction,
    public ownerId: number,
    public visual: string,
    public coefPerSec: number,
    public flatPerSec: number,
    public applies: StatusDef | undefined,
    public skillSlot: SkillSlot | null = null,
  ) {
    super(id, pos, radius);
  }

  spawnInfo(): EntitySpawn {
    return { id: this.id, k: 'zone', x: this.pos.x, y: this.pos.y, r: this.radius, visual: this.visual, dur: this.left };
  }
}

export class LootItem extends Entity {
  readonly kind = 'item' as const;
  age = 0;

  constructor(
    id: number,
    pos: Vec2,
    public ownerId: number,
    public item: Item,
  ) {
    super(id, pos, 0.3);
  }

  override visibleTo(playerId: number): boolean {
    return playerId === this.ownerId;
  }

  spawnInfo(): EntitySpawn {
    return { id: this.id, k: 'item', x: this.pos.x, y: this.pos.y, r: this.radius, name: this.item.name, rarity: this.item.rarity, ownerId: this.ownerId };
  }
}

export class ShardPile extends Entity {
  readonly kind = 'shards' as const;
  age = 0;

  constructor(
    id: number,
    pos: Vec2,
    public ownerId: number,
    public amount: number,
  ) {
    super(id, pos, 0.25);
  }

  override visibleTo(playerId: number): boolean {
    return playerId === this.ownerId;
  }

  spawnInfo(): EntitySpawn {
    return { id: this.id, k: 'shards', x: this.pos.x, y: this.pos.y, r: this.radius, amount: this.amount, ownerId: this.ownerId };
  }
}

export class Globe extends Entity {
  readonly kind = 'globe' as const;
  age = 0;

  spawnInfo(): EntitySpawn {
    return { id: this.id, k: 'globe', x: this.pos.x, y: this.pos.y, r: this.radius };
  }
}

/** A telegraphed strike that resolves after a delay (Anula Bloom, slams, Stonebend). */
export interface DelayedStrike {
  pos: Vec2;
  radius: number;
  left: number;
  faction: Faction;
  ownerId: number;
  coef: number;
  flat: number;
  applies?: StatusDef;
  visual: string;
  skillSlot: SkillSlot | null;
}
