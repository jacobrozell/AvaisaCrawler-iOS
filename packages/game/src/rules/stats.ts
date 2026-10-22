// Sheet damage and toughness. The body contributes Flesh. Gear anchors add on top.
// Trophy leftovers are a small Flesh remainder. Retired powers do not apply.

import { WARDEN } from '../content/classes.js';
import { itemHooks } from '../content/reliquaries.js';
import { BASE_MOVE_SPEED, BASE_PICKUP_RADIUS } from '../constants.js';
import { LOADOUT_KEYS, type Item, type Loadout, type LoadoutKey } from './character.js';

export interface DerivedStats {
  anchor: number;
  flesh: number;
  vitality: number;
  maxLife: number;
  armor: number;
  weaponMin: number;
  weaponMax: number;
  attacksPerSecond: number;
  critChance: number;
  critDamage: number;
  damagePct: number;
  eliteDamage: number;
  cooldownReduction: number;
  ultimateCdr: number;
  costReduction: number;
  resourceGen: number;
  /** Artifact button damage. The old "secondary" hook writes here. */
  secondaryDamage: number;
  lifeOnHit: number;
  lifeRegen: number;
  moveSpeed: number;
  shardFind: number;
  pickupRadius: number;
  dps: number;
  toughness: number;
}

export const BASE_CRIT_CHANCE = 0.05;
export const BASE_CRIT_DAMAGE = 0.5;

export function armorReduction(armor: number, monsterLevel: number): number {
  return armor / (armor + 50 * monsterLevel + 100);
}

export function deriveStats(level: number, equipped: Loadout, trophy: readonly Item[] = []): DerivedStats {
  const sum: Partial<Record<string, number>> = {};
  const add = (k: string, v: number): void => {
    sum[k] = (sum[k] ?? 0) + v;
  };

  let armor = WARDEN.baseArmor + level * 2;
  let weaponMin = 2;
  let weaponMax = 3;
  let weaponSpeed = 1;

  for (const key of LOADOUT_KEYS) {
    const it = equipped[key];
    if (!it) continue;
    if (it.weapon) {
      weaponMin = it.weapon.min;
      weaponMax = it.weapon.max;
      weaponSpeed = it.weapon.speed;
    }
    if (it.armor) armor += it.armor;
    for (const a of it.affixes) add(a.id, a.value);
    if (!it.retired) {
      for (const h of itemHooks(it)) {
        if (h.kind === 'stats') for (const [k, v] of Object.entries(h.stats)) add(k, v ?? 0);
      }
    }
  }
  for (const it of trophy) add('flesh', it.leftover ?? 0);

  const get = (k: string): number => sum[k] ?? 0;
  const flesh = 10 + 3 * (level - 1) + get('flesh');
  const anchor = flesh + get('earth') + get('sky');
  const vitality = 9 + 2 * (level - 1) + get('vitality');
  armor += get('armor');
  const maxLife = Math.round(WARDEN.baseLife + WARDEN.lifePerLevel * (level - 1) + vitality * 5);
  const attacksPerSecond = weaponSpeed * (1 + get('attackSpeed'));
  const critChance = Math.min(0.75, BASE_CRIT_CHANCE + get('critChance'));
  const critDamage = BASE_CRIT_DAMAGE + get('critDamage');
  const damagePct = get('damagePct');
  const avg = (weaponMin + weaponMax) / 2;
  const dps = avg * attacksPerSecond * (1 + anchor / 100) * (1 + damagePct) * (1 + critChance * critDamage);
  const toughness = maxLife / (1 - armorReduction(armor, level));

  return {
    anchor,
    flesh,
    vitality,
    maxLife,
    armor: Math.round(armor),
    weaponMin,
    weaponMax,
    attacksPerSecond,
    critChance,
    critDamage,
    damagePct,
    eliteDamage: get('eliteDamage'),
    cooldownReduction: Math.min(0.6, get('cooldownReduction')),
    ultimateCdr: get('ultimateCdr'),
    costReduction: Math.min(0.5, get('costReduction')),
    resourceGen: get('resourceGen'),
    secondaryDamage: get('secondaryDamage'),
    lifeOnHit: get('lifeOnHit'),
    lifeRegen: get('lifeRegen') + maxLife * 0.004,
    moveSpeed: BASE_MOVE_SPEED * (1 + Math.min(0.4, get('moveSpeed'))),
    shardFind: get('shardFind'),
    pickupRadius: BASE_PICKUP_RADIUS + get('pickupRadius'),
    dps,
    toughness,
  };
}

export function placementFor(level: number, equipped: Loadout, item: Item): LoadoutKey {
  if (item.slot === 'weapon') return 'weapon';
  if (item.slot === 'plate') return 'plate';
  if (item.slot === 'charm') return 'charm';
  for (const key of ['artifact0', 'artifact1', 'artifact2'] as const) if (!equipped[key]) return key;
  let worst: LoadoutKey = 'artifact0';
  let worstScore = Infinity;
  const worn = deriveStats(level, equipped);
  for (const key of ['artifact0', 'artifact1', 'artifact2'] as const) {
    const without = { ...equipped };
    delete without[key];
    const score = worn.dps - deriveStats(level, without).dps;
    if (score < worstScore) {
      worstScore = score;
      worst = key;
    }
  }
  return worst;
}

export function compareItem(level: number, equipped: Loadout, item: Item, trophy: readonly Item[] = []): { dps: number; toughness: number; slot: LoadoutKey } {
  const slot = placementFor(level, equipped, item);
  const before = deriveStats(level, equipped, trophy);
  const after = deriveStats(level, { ...equipped, [slot]: item }, trophy);
  return {
    dps: before.dps > 0 ? after.dps / before.dps - 1 : 0,
    toughness: before.toughness > 0 ? after.toughness / before.toughness - 1 : 0,
    slot,
  };
}
