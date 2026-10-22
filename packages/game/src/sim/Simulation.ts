// The authoritative, I/O-free game simulation for one instance. Deterministic given
// its seed and the ordered stream of player inputs, which is what lets an instance
// run anywhere (this process, a worker thread, another machine) behind a message seam.

import {
  DistanceField,
  ELITE_AFFIXES,
  GLOBE_HEAL_PCT,
  MONSTERS,
  Rng,
  TICK_SECONDS,
  itemHooks,
  type EliteAffixId,
  type GameEvent,
  type Item,
  type MonsterAbility,
  type StatusDef,
  type TileMap,
  type Vec2,
  monsterDamageScale,
  monsterLifeScale,
} from '../bridge.js';
import { updateMonsterAi } from './ai.js';
import { applyStatus, damagePlayer, healUnit, playerHitMonster, runProc, tickUnitTimers } from './combat.js';
import {
  Entity,
  Globe,
  GroundZone,
  LootItem,
  Monster,
  Player,
  Projectile,
  ShardPile,
  type DelayedStrike,
  type EliteTier,
  type Faction,
  type Unit,
} from './entities.js';
import { gainResource, updatePlayer } from './playerSystem.js';
import { SpatialHash } from './spatial.js';

export interface SimHooks {
  onMonsterKilled(m: Monster, killer: Player | null): void;
  onPlayerDied(p: Player): void;
  onShardsPicked(p: Player, amount: number): void;
}

export interface SimScaling {
  monsterLevel: number;
  lifeMult: number;
  damageMult: number;
}

const LOOT_LIFETIME = 300;
const FIELD_REBUILD_TICKS = 4;
const FIELD_RADIUS = 48;
const DORMANCY_CHECK_TICKS = 10;
const WAKE_RADIUS = 30;

export class Simulation {
  tick = 0;
  time = 0;
  readonly entities = new Map<number, Entity>();
  readonly players = new Map<number, Player>();
  readonly monsters = new Map<number, Monster>();
  readonly projectiles = new Map<number, Projectile>();
  readonly zones = new Map<number, GroundZone>();
  readonly loot = new Map<number, LootItem | ShardPile | Globe>();
  strikes: DelayedStrike[] = [];
  events: GameEvent[] = [];
  readonly units = new SpatialHash<Unit>(4);
  readonly all = new SpatialHash<Entity>(6);
  readonly field: DistanceField;
  readonly rng: Rng;
  private nextId = 1;
  /** Extra life multiplier from party size; changes when players join/leave. */
  partyLifeMult = 1;
  hooks: SimHooks = { onMonsterKilled: () => {}, onPlayerDied: () => {}, onShardsPicked: () => {} };

  constructor(
    readonly map: TileMap,
    seed: number,
    public spawnPoint: Vec2,
    public scaling: SimScaling,
    readonly peaceful = false,
  ) {
    this.rng = new Rng(seed);
    this.field = new DistanceField(map);
  }

  allocId(): number {
    return this.nextId++;
  }

  emit(e: GameEvent): void {
    this.events.push(e);
  }

  // ── Membership

  addPlayer(p: Player): void {
    this.entities.set(p.id, p);
    this.players.set(p.id, p);
    p.changedTick = this.tick;
  }

  removePlayer(id: number): Player | undefined {
    const p = this.players.get(id);
    if (!p) return undefined;
    for (const petId of p.pets) this.remove(petId);
    p.pets.clear();
    this.players.delete(id);
    this.entities.delete(id);
    // Personal loot leaves with its owner.
    for (const l of this.loot.values()) if (!(l instanceof Globe) && l.ownerId === id) this.remove(l.id);
    return p;
  }

  remove(id: number): void {
    const e = this.entities.get(id);
    if (!e) return;
    e.removed = true;
    this.entities.delete(id);
    this.monsters.delete(id);
    this.projectiles.delete(id);
    this.zones.delete(id);
    this.loot.delete(id);
    if (e instanceof Monster && e.ownerId) this.players.get(e.ownerId)?.pets.delete(id);
  }

  // ── Spawning

  spawnMonster(
    defId: string,
    pos: Vec2,
    opts: { tier?: EliteTier; affixes?: EliteAffixId[]; name?: string; ownerId?: number; ttl?: number; level?: number } = {},
  ): Monster {
    const def = MONSTERS[defId];
    if (!def) throw new Error(`unknown monster ${defId}`);
    const tier = opts.tier ?? 'normal';
    const affixes = opts.affixes ?? [];
    const level = opts.level ?? this.scaling.monsterLevel;
    const extra: MonsterAbility[] = [];
    let lifeMult = 1;
    let speedMult = 1;
    let atkMult = 1;
    let takenMult = 1;
    for (const a of affixes) {
      const ad = ELITE_AFFIXES[a];
      if (ad.ability) extra.push(ad.ability);
      lifeMult *= ad.lifeMult ?? 1;
      speedMult *= ad.speedMult ?? 1;
      atkMult *= ad.attackSpeedMult ?? 1;
      takenMult *= ad.damageTakenMult ?? 1;
    }
    const tierLife = tier === 'champion' ? 3.2 : tier === 'rare' ? 4.5 : tier === 'minion' ? 1.6 : 1;
    const tierDmg = tier === 'champion' ? 1.3 : tier === 'rare' ? 1.5 : tier === 'minion' ? 1.1 : 1;
    const isPet = def.ai === 'pet';
    const life = isPet ? 1 : def.life * monsterLifeScale(level) * this.scaling.lifeMult * this.partyLifeMult * tierLife * lifeMult;
    const dmg = def.damage * monsterDamageScale(level) * this.scaling.damageMult * tierDmg;
    const m = new Monster(this.allocId(), { ...pos }, def, level, dmg, tier, affixes, extra);
    m.maxHp = Math.max(1, Math.round(life));
    m.hp = m.maxHp;
    m.speedMult = speedMult;
    m.attackSpeedMult = atkMult;
    m.damageTakenMult = takenMult;
    if (opts.name) m.name = opts.name;
    if (opts.ownerId) {
      m.ownerId = opts.ownerId;
      m.dormant = false;
      this.players.get(opts.ownerId)?.pets.add(m.id);
    }
    if (opts.ttl) m.expiresAt = this.time + opts.ttl;
    m.changedTick = this.tick;
    this.entities.set(m.id, m);
    this.monsters.set(m.id, m);
    return m;
  }

  spawnProjectile(
    from: Vec2,
    dir: Vec2,
    p: {
      speed: number;
      range: number;
      radius: number;
      faction: Faction;
      ownerId: number;
      visual: string;
      coef?: number;
      flat?: number;
      pierce?: number;
      explodeRadius?: number;
      applies?: StatusDef;
      skillSlot?: Projectile['skillSlot'];
    },
  ): Projectile {
    const pr = new Projectile(
      this.allocId(),
      { ...from },
      p.radius,
      { x: dir.x * p.speed, y: dir.y * p.speed },
      p.range,
      p.faction,
      p.ownerId,
      p.visual,
      p.coef ?? 0,
      p.flat ?? 0,
      p.pierce ?? 0,
      p.explodeRadius ?? 0,
      p.applies,
      p.skillSlot ?? null,
    );
    this.entities.set(pr.id, pr);
    this.projectiles.set(pr.id, pr);
    return pr;
  }

  spawnZone(pos: Vec2, z: {
    radius: number;
    duration: number;
    faction: Faction;
    ownerId: number;
    visual: string;
    coefPerSec?: number;
    flatPerSec?: number;
    applies?: StatusDef;
  }): GroundZone {
    const g = new GroundZone(this.allocId(), { ...pos }, z.radius, z.duration, z.faction, z.ownerId, z.visual, z.coefPerSec ?? 0, z.flatPerSec ?? 0, z.applies);
    this.entities.set(g.id, g);
    this.zones.set(g.id, g);
    return g;
  }

  /** Scatter a dropped thing near `at` on a walkable tile. */
  scatter(at: Vec2, spread = 1.4): Vec2 {
    for (let i = 0; i < 8; i++) {
      const p = { x: at.x + this.rng.range(-spread, spread), y: at.y + this.rng.range(-spread, spread) };
      if (!this.map.collides(p.x, p.y, 0.3) && this.map.lineOfSight(at, p)) return p;
    }
    return { ...at };
  }

  dropItem(at: Vec2, ownerId: number, item: Item): LootItem {
    const l = new LootItem(this.allocId(), this.scatter(at), ownerId, item);
    this.entities.set(l.id, l);
    this.loot.set(l.id, l);
    return l;
  }

  dropShards(at: Vec2, ownerId: number, amount: number): ShardPile {
    const s = new ShardPile(this.allocId(), this.scatter(at), ownerId, amount);
    this.entities.set(s.id, s);
    this.loot.set(s.id, s);
    return s;
  }

  dropGlobe(at: Vec2): Globe {
    const g = new Globe(this.allocId(), this.scatter(at), 0.35);
    this.entities.set(g.id, g);
    this.loot.set(g.id, g);
    return g;
  }

  /** Re-scale living monsters when party size in the instance changes. */
  setPartyLifeMult(mult: number): void {
    if (Math.abs(mult - this.partyLifeMult) < 1e-6) return;
    const ratio = mult / this.partyLifeMult;
    this.partyLifeMult = mult;
    for (const m of this.monsters.values()) {
      if (m.kind === 'pet' || m.dead) continue;
      const frac = m.hp / m.maxHp;
      m.maxHp = Math.max(1, Math.round(m.maxHp * ratio));
      m.hp = Math.max(1, Math.round(m.maxHp * frac));
      m.changedTick = this.tick;
    }
  }

  // ── Main loop

  step(): void {
    const dt = TICK_SECONDS;
    this.tick++;
    this.time += dt;

    this.rebuildHashes();

    if (this.tick % FIELD_REBUILD_TICKS === 0 && !this.peaceful) {
      const sources: Vec2[] = [];
      for (const p of this.players.values()) if (!p.dead) sources.push(p.pos);
      this.field.build(sources, FIELD_RADIUS);
    }
    if (this.tick % DORMANCY_CHECK_TICKS === 0) this.updateDormancy();

    for (const p of this.players.values()) {
      tickUnitTimers(this, p, dt);
      updatePlayer(this, p, dt);
    }
    for (const m of this.monsters.values()) {
      if (m.dormant || m.dead) continue;
      tickUnitTimers(this, m, dt);
      if (m.hp <= 0 && !m.dead) {
        this.killMonster(m, null);
        continue;
      }
      if (this.time >= m.expiresAt) {
        this.emit({ t: 'fx', v: 'vanish', x: m.pos.x, y: m.pos.y });
        this.remove(m.id);
        continue;
      }
      updateMonsterAi(this, m, dt);
    }
    this.updateForcedMoves(dt);
    this.updateProjectiles(dt);
    this.updateStrikes(dt);
    this.updateZones(dt);
    this.updateLoot(dt);
    this.flushDeferred();
  }

  private rebuildHashes(): void {
    this.units.clear();
    this.all.clear();
    for (const e of this.entities.values()) {
      this.all.insert(e);
      if ((e instanceof Player || e instanceof Monster) && !e.dead) this.units.insert(e);
    }
  }

  private updateDormancy(): void {
    const ps = [...this.players.values()];
    for (const m of this.monsters.values()) {
      if (!m.dormant) continue;
      for (const p of ps) {
        const dx = p.pos.x - m.pos.x;
        const dy = p.pos.y - m.pos.y;
        if (dx * dx + dy * dy < WAKE_RADIUS * WAKE_RADIUS) {
          m.dormant = false;
          break;
        }
      }
    }
  }

  private updateForcedMoves(dt: number): void {
    const movers: Unit[] = [];
    for (const p of this.players.values()) if (p.forced) movers.push(p);
    for (const m of this.monsters.values()) if (m.forced) movers.push(m);
    for (const u of movers) {
      // A hit earlier in this loop may have killed this unit and cleared its movement.
      const f = u.forced;
      if (!f || u.dead) continue;
      const step = Math.min(dt, f.left);
      const before = u.pos;
      u.pos = this.map.move(u.pos, f.vx * step, f.vy * step, u.radius);
      u.changedTick = this.tick;
      f.left -= step;
      const blocked = Math.hypot(u.pos.x - before.x, u.pos.y - before.y) < 0.01;
      if (f.hit) {
        const enemyFaction: Faction = u.faction === 'players' ? 'monsters' : 'players';
        for (const t of this.units.query(u.pos.x, u.pos.y, f.hit.radius)) {
          if (t.faction !== enemyFaction || t.dead || f.hit.hitIds.has(t.id)) continue;
          f.hit.hitIds.add(t.id);
          if (u instanceof Player && t instanceof Monster) {
            playerHitMonster(this, u, t, f.hit.coef ?? 0, { slot: f.slot ?? 'a0', applies: f.hit.applies });
          } else if (u instanceof Monster && t instanceof Player) {
            damagePlayer(this, t, f.hit.flat ?? 0, u);
          }
        }
      }
      if (f.left <= 0 || blocked) u.forced = null;
    }
  }

  private updateProjectiles(dt: number): void {
    const hits: Unit[] = [];
    for (const pr of this.projectiles.values()) {
      const dx = pr.vel.x * dt;
      const dy = pr.vel.y * dt;
      pr.pos = { x: pr.pos.x + dx, y: pr.pos.y + dy };
      pr.rangeLeft -= Math.hypot(dx, dy);
      if (this.map.solidPoint(pr.pos.x, pr.pos.y) || pr.rangeLeft <= 0) {
        if (pr.explodeRadius > 0) this.explode(pr);
        this.remove(pr.id);
        continue;
      }
      hits.length = 0;
      this.units.query(pr.pos.x, pr.pos.y, pr.radius, hits);
      for (const t of hits) {
        if (t.dead || t.faction === pr.faction || pr.hitIds.has(t.id)) continue;
        pr.hitIds.add(t.id);
        if (pr.explodeRadius > 0) {
          this.explode(pr);
          this.remove(pr.id);
          break;
        }
        this.projectileHit(pr, t);
        if (pr.pierce-- <= 0) {
          this.remove(pr.id);
          break;
        }
      }
    }
  }

  private projectileHit(pr: Projectile, t: Unit): void {
    if (pr.faction === 'players' && t instanceof Monster) {
      const owner = this.players.get(pr.ownerId);
      if (!owner) return;
      playerHitMonster(this, owner, t, pr.coef, { slot: pr.skillSlot ?? undefined, applies: pr.applies });
      if (pr.echoOnHit && pr.hitIds.size === 1) gainResource(owner, pr.echoOnHit);
    } else if (pr.faction === 'monsters' && t instanceof Player) {
      damagePlayer(this, t, pr.flat, this.monsters.get(pr.ownerId) ?? null);
    }
  }

  private explode(pr: Projectile): void {
    this.emit({ t: 'fx', v: `${pr.visual}_boom`, x: pr.pos.x, y: pr.pos.y, r: pr.explodeRadius });
    for (const t of this.units.query(pr.pos.x, pr.pos.y, pr.explodeRadius)) {
      if (t.dead || t.faction === pr.faction) continue;
      this.projectileHit(pr, t);
    }
  }

  private updateStrikes(dt: number): void {
    const keep: DelayedStrike[] = [];
    for (const s of this.strikes) {
      s.left -= dt;
      if (s.left > 0) {
        keep.push(s);
        continue;
      }
      this.emit({ t: 'fx', v: s.visual, x: s.pos.x, y: s.pos.y, r: s.radius });
      for (const t of this.units.query(s.pos.x, s.pos.y, s.radius)) {
        if (t.dead || t.faction === s.faction) continue;
        if (s.faction === 'players' && t instanceof Monster) {
          const owner = this.players.get(s.ownerId);
          if (owner) playerHitMonster(this, owner, t, s.coef, { slot: s.skillSlot ?? undefined, applies: s.applies });
        } else if (s.faction === 'monsters' && t instanceof Player) {
          damagePlayer(this, t, s.flat, this.monsters.get(s.ownerId) ?? null);
          if (s.applies) applyStatus(this, t, s.applies, null);
        }
      }
    }
    this.strikes = keep;
  }

  private updateZones(dt: number): void {
    for (const z of this.zones.values()) {
      z.left -= dt;
      if (z.left <= 0) {
        this.remove(z.id);
        continue;
      }
      z.tickTimer -= dt;
      if (z.tickTimer > 0) continue;
      z.tickTimer = 0.5;
      for (const t of this.units.query(z.pos.x, z.pos.y, z.radius)) {
        if (t.dead || t.faction === z.faction) continue;
        if (z.faction === 'players' && t instanceof Monster) {
          const owner = this.players.get(z.ownerId);
          if (owner) playerHitMonster(this, owner, t, z.coefPerSec * 0.5, { slot: z.skillSlot ?? 'a0', applies: z.applies, noProcs: true });
        } else if (z.faction === 'monsters' && t instanceof Player) {
          damagePlayer(this, t, z.flatPerSec * 0.5, null);
        }
      }
    }
  }

  private updateLoot(dt: number): void {
    for (const l of this.loot.values()) {
      l.age += dt;
      if (l.age > LOOT_LIFETIME) {
        this.remove(l.id);
        continue;
      }
      if (l instanceof LootItem) continue;
      // Shards and globes are collected by walking near them.
      for (const p of this.players.values()) {
        if (p.dead) continue;
        if (l instanceof ShardPile && l.ownerId !== p.id) continue;
        const r = p.stats.pickupRadius + l.radius;
        if ((p.pos.x - l.pos.x) ** 2 + (p.pos.y - l.pos.y) ** 2 > r * r) continue;
        if (l instanceof ShardPile) {
          p.char.shards += l.amount;
          p.charDirty = true;
          this.hooks.onShardsPicked(p, l.amount);
          this.emit({ t: 'fx', v: 'shards', x: l.pos.x, y: l.pos.y });
          for (const it of Object.values(p.char.equipped)) {
            for (const h of itemHooks(it)) if (h.kind === 'onShardPickup') healUnit(this, p, p.maxHp * h.healPct);
          }
        } else {
          healUnit(this, p, p.maxHp * GLOBE_HEAL_PCT);
          this.emit({ t: 'fx', v: 'globe', x: l.pos.x, y: l.pos.y });
        }
        this.remove(l.id);
        break;
      }
    }
  }

  // ── Death

  killMonster(m: Monster, killer: Player | null): void {
    if (m.dead) return;
    m.dead = true;
    m.hp = 0;
    m.windup = null;
    m.forced = null;
    m.changedTick = this.tick;
    this.emit({ t: 'die', id: m.id, x: m.pos.x, y: m.pos.y });
    if (m.affixes.includes('volatile')) {
      this.strikes.push({
        pos: { ...m.pos }, radius: 2.4, left: 1.0, faction: 'monsters', ownerId: m.id, coef: 0, flat: m.damage * 1.6, visual: 'volatile', skillSlot: null,
      });
      this.emit({ t: 'tele', x: m.pos.x, y: m.pos.y, r: 2.4, d: 1.0 });
    }
    if (killer && m.kind !== 'pet') {
      for (const it of Object.values(killer.char.equipped)) {
        for (const h of itemHooks(it)) {
          if (h.kind === 'onKillProc' && this.rng.chance(h.chance)) runProc(this, killer, h.effect, null);
        }
      }
    }
    if (m.kind !== 'pet') this.hooks.onMonsterKilled(m, killer);
    // Corpses linger briefly for the death animation, then go.
    this.deferredRemovals.push({ id: m.id, at: this.time + 0.6 });
  }

  private deferredRemovals: { id: number; at: number }[] = [];

  private flushDeferred(): void {
    const now = this.time;
    this.deferredRemovals = this.deferredRemovals.filter((d) => {
      if (d.at > now) return true;
      this.remove(d.id);
      return false;
    });
  }

  killPlayer(p: Player): void {
    if (p.dead) return;
    p.dead = true;
    p.hp = 0;
    p.forced = null;
    p.castLock = 0;
    p.respawnLeft = 0;
    p.dots = [];
    p.changedTick = this.tick;
    for (const petId of p.pets) this.remove(petId);
    p.pets.clear();
    p.char.stats.deaths++;
    p.charDirty = true;
    this.emit({ t: 'die', id: p.id, x: p.pos.x, y: p.pos.y });
    // Death ends the run. The sim does not raise the Warden.
    this.hooks.onPlayerDied(p);
  }
}
