// Symbols the copied sim imports. Kept as one module so the sim files stay close to the POC.

export { angleDiff, angleOf, dist, fromAngle, norm, Rng, type Vec2 } from './math.js';
export {
  ACTION_SLOTS,
  BASE_PICKUP_RADIUS,
  BTN,
  DEEP_VEIN_SECONDS,
  ECHO_FILL,
  GLOBE_HEAL_PCT,
  LEVEL_CAP,
  PACK_CAP,
  PLAYER_RADIUS,
  POTION_COOLDOWN,
  POTION_HEAL_PCT,
  TICK_RATE,
  TICK_SECONDS,
  type ActionSlot,
  type SkillSlot,
} from './constants.js';
export { STATE, type EntityKind, type EntitySpawn, type EntityUpdate, type GameEvent } from './events.js';
export { CLASSES, ECHO_SURGE_DAMAGE, ECHO_SURGE_THRESHOLD, ECHO_SURGE_VULNERABILITY, WARDEN } from './content/classes.js';
export { ACTS, DEFAULT_SWING, type ActDef, type SwingDef } from './content/acts.js';
export type { SkillEffect, StatusDef } from './content/effects.js';
export { ELITE_AFFIXES, ELITE_NAME_PARTS, MONSTERS, PACK_TABLE, VESSEL_IDS, monsterDamageScale, monsterLifeScale, type EliteAffixId, type MonsterAbility, type MonsterDef } from './content/monsters.js';
export { LEGENDARIES, actFor, itemHooks, swingFor } from './content/reliquaries.js';
export type { ProcEffect } from './content/reliquaries.js';
export { ITEM_BASES } from './content/items.js';
export { DistanceField, Tile, TileMap } from './map/tilemap.js';
export type { DungeonLayout } from './map/dungeon.js';
export { armorReduction } from './rules/stats.js';
export type { DerivedStats } from './rules/stats.js';
export type { CharacterData, Item, Loadout } from './rules/character.js';
