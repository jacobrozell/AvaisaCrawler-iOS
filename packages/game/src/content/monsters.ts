// Monsters of the Echo Shafts: Red Litany cultists, pit fauna, and the Vessels —
// deep-rite subjects who are no longer people (SAGA §8.11, writing rule 3).

export type MonsterAi = 'melee' | 'ranged' | 'flee' | 'pet' | 'boss';
export type MonsterFamily = 'litany' | 'pit' | 'spirit' | 'vessel';

export type MonsterAbility =
  | { kind: 'melee'; cooldown: number; range: number; coef: number; windup: number }
  | { kind: 'projectile'; cooldown: number; range: number; coef: number; windup: number; speed: number; count?: number; spread?: number; visual: string }
  | { kind: 'nova'; cooldown: number; coef: number; windup: number; count: number; speed: number; range: number; visual: string }
  | { kind: 'slam'; cooldown: number; range: number; coef: number; windup: number; radius: number }
  | { kind: 'charge'; cooldown: number; range: number; coef: number; windup: number; speed: number }
  | { kind: 'summon'; cooldown: number; monsterId: string; count: number; windup: number; range: number }
  | { kind: 'pool'; cooldown: number; range: number; coefPerSec: number; radius: number; duration: number; windup: number }
  | { kind: 'heal'; cooldown: number; pct: number; radius: number; windup: number };

export interface MonsterDef {
  id: string;
  name: string;
  family: MonsterFamily;
  ai: MonsterAi;
  /** Life and damage at monster level 1, before pressure/party scaling. */
  life: number;
  damage: number;
  speed: number;
  radius: number;
  xp: number;
  aggroRange: number;
  /** Ranged AI tries to hold this distance. */
  preferredRange?: number;
  abilities: MonsterAbility[];
  /** Echo meter contribution when killed inside an Echo Shaft. */
  echo: number;
  dropMult: number;
  shardMult: number;
  color: string;
  shape: 'thrall' | 'cultist' | 'chanter' | 'brute' | 'crawler' | 'mite' | 'runner' | 'wolf' | 'boss';
  /** Flee AI: seconds before escaping down a shaft. */
  escapeAfter?: number;
  bossPhases?: boolean;
  /** Story bosses only spawn where scripted; excluded from random packs. */
  unique?: boolean;
}

const M = (d: MonsterDef): MonsterDef => d;

export const MONSTERS: Record<string, MonsterDef> = {
  thrall: M({
    id: 'thrall', name: 'Echo Thrall', family: 'litany', ai: 'melee', life: 16, damage: 4, speed: 3.1, radius: 0.4, xp: 5,
    aggroRange: 9, abilities: [{ kind: 'melee', cooldown: 1.2, range: 1.0, coef: 1, windup: 0.3 }],
    echo: 1, dropMult: 0.7, shardMult: 0.7, color: '#8a6f6a', shape: 'thrall',
  }),
  initiate: M({
    id: 'initiate', name: 'Litany Initiate', family: 'litany', ai: 'melee', life: 28, damage: 6, speed: 3.5, radius: 0.42, xp: 8,
    aggroRange: 10, abilities: [{ kind: 'melee', cooldown: 1.1, range: 1.1, coef: 1, windup: 0.3 }],
    echo: 1.5, dropMult: 1, shardMult: 1, color: '#9c2f36', shape: 'cultist',
  }),
  chanter: M({
    id: 'chanter', name: 'Scar Chanter', family: 'litany', ai: 'ranged', life: 22, damage: 7, speed: 2.8, radius: 0.42, xp: 9,
    aggroRange: 11, preferredRange: 6,
    abilities: [{ kind: 'projectile', cooldown: 2.2, range: 10, coef: 1, windup: 0.45, speed: 9, visual: 'bloodbolt' }],
    echo: 2, dropMult: 1.1, shardMult: 1, color: '#c43d63', shape: 'chanter',
  }),
  deserter: M({
    id: 'deserter', name: 'Blood-Plate Deserter', family: 'litany', ai: 'melee', life: 80, damage: 12, speed: 2.4, radius: 0.62, xp: 22,
    aggroRange: 9,
    abilities: [
      { kind: 'melee', cooldown: 1.6, range: 1.4, coef: 1, windup: 0.45 },
      { kind: 'slam', cooldown: 6, range: 3, coef: 1.8, windup: 0.9, radius: 2.4 },
    ],
    echo: 4, dropMult: 1.6, shardMult: 1.4, color: '#6e1e24', shape: 'brute',
  }),
  crawler: M({
    id: 'crawler', name: 'Pit Crawler', family: 'pit', ai: 'melee', life: 24, damage: 6, speed: 4.1, radius: 0.45, xp: 8,
    aggroRange: 10,
    abilities: [
      { kind: 'melee', cooldown: 1.0, range: 1.0, coef: 1, windup: 0.25 },
      { kind: 'charge', cooldown: 5, range: 7, coef: 1.4, windup: 0.5, speed: 14 },
    ],
    echo: 1.5, dropMult: 0.9, shardMult: 0.8, color: '#5b6b4a', shape: 'crawler',
  }),
  mite: M({
    id: 'mite', name: 'Crystal Mite', family: 'pit', ai: 'melee', life: 9, damage: 3, speed: 4.4, radius: 0.3, xp: 3,
    aggroRange: 9, abilities: [{ kind: 'melee', cooldown: 0.9, range: 0.8, coef: 1, windup: 0.2 }],
    echo: 0.5, dropMult: 0.4, shardMult: 1.5, color: '#4fb6e8', shape: 'mite',
  }),
  tithe_runner: M({
    id: 'tithe_runner', name: 'Tithe-Runner', family: 'litany', ai: 'flee', life: 240, damage: 0, speed: 4.6, radius: 0.5, xp: 40,
    aggroRange: 8, abilities: [], escapeAfter: 22,
    echo: 8, dropMult: 6, shardMult: 12, color: '#e0b04a', shape: 'runner',
  }),
  spirit_wolf: M({
    id: 'spirit_wolf', name: 'Spirit Wolf', family: 'spirit', ai: 'pet', life: 1, damage: 0, speed: 6, radius: 0.4, xp: 0,
    aggroRange: 9, abilities: [{ kind: 'melee', cooldown: 0.8, range: 1.1, coef: 0.6, windup: 0.15 }],
    echo: 0, dropMult: 0, shardMult: 0, color: '#8fe3ff', shape: 'wolf',
  }),

  // ── Bosses
  brother_varn: M({
    id: 'brother_varn', name: 'Brother Varn, the First Voice', family: 'litany', ai: 'boss', life: 1100, damage: 11, speed: 3.0,
    radius: 0.9, xp: 400, aggroRange: 14, bossPhases: true, unique: true,
    abilities: [
      { kind: 'melee', cooldown: 1.4, range: 1.8, coef: 1.2, windup: 0.35 },
      { kind: 'nova', cooldown: 6, coef: 0.9, windup: 0.8, count: 14, speed: 8, range: 14, visual: 'bloodbolt' },
      { kind: 'summon', cooldown: 13, monsterId: 'thrall', count: 4, windup: 1.0, range: 4 },
      { kind: 'charge', cooldown: 9, range: 10, coef: 1.6, windup: 0.7, speed: 15 },
    ],
    echo: 0, dropMult: 0, shardMult: 20, color: '#d1263a', shape: 'boss',
  }),
  hollow_foreman: M({
    id: 'hollow_foreman', name: 'The Hollow Foreman', family: 'vessel', ai: 'boss', life: 950, damage: 14, speed: 2.6,
    radius: 1.0, xp: 500, aggroRange: 16, bossPhases: true, unique: true,
    abilities: [
      { kind: 'melee', cooldown: 1.5, range: 2.0, coef: 1.3, windup: 0.45 },
      { kind: 'slam', cooldown: 5, range: 6, coef: 2.2, windup: 1.0, radius: 3.2 },
      { kind: 'charge', cooldown: 8, range: 12, coef: 1.8, windup: 0.8, speed: 16 },
      { kind: 'summon', cooldown: 14, monsterId: 'crawler', count: 3, windup: 1.0, range: 4 },
    ],
    echo: 0, dropMult: 0, shardMult: 25, color: '#7a2b18', shape: 'boss',
  }),
  choir_of_scars: M({
    id: 'choir_of_scars', name: 'Choir of Scars', family: 'vessel', ai: 'boss', life: 820, damage: 12, speed: 2.4,
    radius: 0.95, xp: 500, aggroRange: 16, preferredRange: 7, bossPhases: true, unique: true,
    abilities: [
      { kind: 'projectile', cooldown: 1.8, range: 12, coef: 1, windup: 0.4, speed: 10, count: 5, spread: 40, visual: 'bloodbolt' },
      { kind: 'nova', cooldown: 5, coef: 0.8, windup: 0.9, count: 18, speed: 7, range: 15, visual: 'bloodbolt' },
      { kind: 'heal', cooldown: 12, pct: 0.06, radius: 10, windup: 1.2 },
      { kind: 'summon', cooldown: 12, monsterId: 'chanter', count: 2, windup: 1.0, range: 5 },
    ],
    echo: 0, dropMult: 0, shardMult: 25, color: '#a31d4f', shape: 'boss',
  }),
  mother_of_mites: M({
    id: 'mother_of_mites', name: 'Mother of Mites', family: 'vessel', ai: 'boss', life: 900, damage: 11, speed: 3.2,
    radius: 1.0, xp: 500, aggroRange: 16, bossPhases: true, unique: true,
    abilities: [
      { kind: 'melee', cooldown: 1.2, range: 1.8, coef: 1.1, windup: 0.3 },
      { kind: 'summon', cooldown: 7, monsterId: 'mite', count: 6, windup: 0.8, range: 4 },
      { kind: 'pool', cooldown: 6, range: 9, coefPerSec: 0.8, radius: 2.4, duration: 6, windup: 0.6 },
      { kind: 'charge', cooldown: 9, range: 10, coef: 1.5, windup: 0.6, speed: 15 },
    ],
    echo: 0, dropMult: 0, shardMult: 25, color: '#3c9fd0', shape: 'boss',
  }),
};

export const VESSEL_IDS = ['hollow_foreman', 'choir_of_scars', 'mother_of_mites'] as const;

/** Weighted pack templates for random spawns. */
export const PACK_TABLE: readonly (readonly [string[], number])[] = [
  [['thrall', 'thrall', 'thrall', 'thrall', 'initiate'], 10],
  [['initiate', 'initiate', 'chanter'], 10],
  [['initiate', 'chanter', 'chanter', 'thrall', 'thrall'], 8],
  [['deserter', 'thrall', 'thrall'], 6],
  [['crawler', 'crawler', 'crawler'], 7],
  [['mite', 'mite', 'mite', 'mite', 'mite', 'mite'], 6],
  [['deserter', 'chanter', 'chanter'], 4],
];

// ── Elite ("champion" / "rare") modifiers, Red Litany flavored.

export type EliteAffixId = 'frenzied' | 'chanting' | 'volatile' | 'echoing' | 'plated' | 'dusttrail';

export interface EliteAffixDef {
  id: EliteAffixId;
  name: string;
  description: string;
  lifeMult?: number;
  speedMult?: number;
  attackSpeedMult?: number;
  damageTakenMult?: number;
  /** Extra ability granted to every member of the pack. */
  ability?: MonsterAbility;
}

export const ELITE_AFFIXES: Record<EliteAffixId, EliteAffixDef> = {
  frenzied: { id: 'frenzied', name: 'Frenzied', description: 'Faster movement and attacks.', speedMult: 1.35, attackSpeedMult: 1.4 },
  chanting: {
    id: 'chanting', name: 'Chanting', description: 'Heals nearby allies in unison.',
    ability: { kind: 'heal', cooldown: 6, pct: 0.12, radius: 7, windup: 0.6 },
  },
  volatile: { id: 'volatile', name: 'Volatile', description: 'Explodes shortly after death.' },
  echoing: {
    id: 'echoing', name: 'Echoing', description: 'Periodically releases a ring of blood bolts.',
    ability: { kind: 'nova', cooldown: 5, coef: 0.7, windup: 0.6, count: 8, speed: 7, range: 10, visual: 'bloodbolt' },
  },
  plated: { id: 'plated', name: 'Plated', description: 'Plate fused to skin: more life, less damage taken.', lifeMult: 1.5, damageTakenMult: 0.75 },
  dusttrail: {
    id: 'dusttrail', name: 'Dust-Trailed', description: 'Leaves pools of caustic Anula dust.',
    ability: { kind: 'pool', cooldown: 4, range: 0, coefPerSec: 0.6, radius: 1.6, duration: 5, windup: 0 },
  },
};

export const ELITE_NAME_PARTS = {
  first: ['Hessan', 'Marl', 'Tovric', 'Ysel', 'Brannoc', 'Odda', 'Corvin', 'Senna', 'Halvard', 'Mirela', 'Dusk', 'Arvo'],
  epithet: ['the Many-Voiced', 'Scar-Singer', 'the Unrotated', 'Plate-Wed', 'the Warm Below', 'Who Bled First', 'the Unbound', 'Red-Thread', 'Echo-Drunk', 'the Hollow'],
};

/** Monster level scaling (life and damage multipliers). */
export const monsterLifeScale = (level: number): number => Math.pow(1.16, level - 1);
export const monsterDamageScale = (level: number): number => Math.pow(1.115, level - 1);
