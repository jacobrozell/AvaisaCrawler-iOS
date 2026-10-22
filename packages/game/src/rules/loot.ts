// Drop table. No class smart loot. Seasonal reliquaries are weighted above the core six.
// Each reliquary keeps the anchor it was authored with.

import { actById } from '../content/acts.js';
import {
  AFFIXES,
  ANCHOR_AFFIXES,
  ITEM_BASES,
  RARITY_INFO,
  armorScale,
  weaponScale,
  type AffixDef,
  type AffixId,
  type ItemBase,
  type Rarity,
  type Slot,
} from '../content/items.js';
import { LEGENDARIES, relicPool, type LegendaryDef } from '../content/reliquaries.js';
import { Rng } from '../math.js';
import type { Item, ItemAffix } from './character.js';

export type EliteTier = 'normal' | 'champion' | 'rare' | 'boss';

const RARITY_QUALITY: Record<Rarity, number> = { scrap: 1, graded: 1.05, stamped: 1.12, reliquary: 1.2 };

const SLOT_WEIGHTS: readonly (readonly [Slot, number])[] = [
  ['weapon', 3],
  ['plate', 3],
  ['artifact', 4],
  ['charm', 2],
];

export function newItemId(rng: Rng): string {
  return `${Math.floor(rng.next() * 0xffffffff).toString(36)}${Math.floor(rng.next() * 0xffffffff).toString(36)}`;
}

export function rollRarity(rng: Rng, reliquaryMult: number, tier: EliteTier = 'normal'): Rarity {
  const boost = tier === 'boss' ? 4 : tier === 'rare' ? 2.5 : tier === 'champion' ? 1.8 : 1;
  return rng.weighted<Rarity>([
    ['scrap', 46 / boost],
    ['graded', 40],
    ['stamped', 12 * boost],
    ['reliquary', 1.15 * reliquaryMult * boost],
  ]);
}

export function rollLegendary(rng: Rng, mutator: boolean, slot?: Slot): LegendaryDef {
  const pool = relicPool(mutator, slot);
  const rows = (pool.length ? pool : relicPool(false)).map((l) => [l, l.weight] as const);
  return rng.weighted(rows);
}

function rollAffixValue(rng: Rng, def: AffixDef, ilvl: number, quality = 1): number {
  const lo = def.min + def.perLevel * (ilvl - 1);
  const hi = def.max + def.perLevel * (ilvl - 1);
  let v = rng.range(lo, hi) * quality;
  if (def.cap !== undefined) v = Math.min(def.cap, v);
  return def.format === 'flat' ? Math.round(v) : def.format === 'perSec' ? Math.round(v * 10) / 10 : Math.round(v * 1000) / 1000;
}

function pickAffixes(rng: Rng, slot: Slot, count: number, authoredAnchor: AffixId | null): AffixId[] {
  const chosen: AffixId[] = [];
  if (authoredAnchor && count > 0) chosen.push(authoredAnchor);
  while (chosen.length < count) {
    const pool = Object.values(AFFIXES).filter((a) => {
      if (!a.slots.includes(slot) || chosen.includes(a.id)) return false;
      if (ANCHOR_AFFIXES.includes(a.id) && chosen.some((c) => ANCHOR_AFFIXES.includes(c))) return false;
      return true;
    });
    if (!pool.length) break;
    chosen.push(rng.weighted(pool.map((a) => [a.id, a.weight] as const)));
  }
  return chosen;
}

const GRADED_PREFIX: Partial<Record<AffixId, string>> = {
  flesh: 'Plate-Bound', earth: 'Rooted', sky: 'Ringed', vitality: 'Stout', critChance: 'Keen', critDamage: 'Cruel',
  attackSpeed: 'Quick', damagePct: 'Honed', eliteDamage: 'Hunting', cooldownReduction: 'Measured', costReduction: 'Frugal',
  lifeOnHit: 'Leeching', lifeRegen: 'Mending', armor: 'Reinforced', moveSpeed: 'Swift', shardFind: 'Prospector’s',
  pickupRadius: 'Magnetized',
};
const STAMPED_A = ['Echo-Bitten', 'Ledgered', 'Red-Seam', 'Charter', 'Pit-Seven', 'Crown-Stamped', 'Warm-Below', 'Line-Struck'];
const STAMPED_B = ['Oath', 'Debt', 'Litany', 'Ward', 'Tithe', 'Relay', 'Seam', 'Rotation'];

export interface RollOptions {
  ilvl: number;
  rarity: Rarity;
  slot?: Slot;
  legendaryId?: string;
  /** Event rows join the table only while the fetched mutator flag is on. */
  mutator?: boolean;
}

export function rollItem(rng: Rng, opts: RollOptions): Item {
  const { ilvl, rarity } = opts;
  const mutator = opts.mutator ?? false;
  let base: ItemBase;
  let legendaryId: string | undefined;
  let authored: AffixId | null = null;
  if (rarity === 'reliquary') {
    const leg = opts.legendaryId ? LEGENDARIES[opts.legendaryId]! : rollLegendary(rng, mutator, opts.slot);
    legendaryId = leg.id;
    base = ITEM_BASES[leg.baseId]!;
    authored = leg.anchor;
  } else {
    const slot = opts.slot ?? rng.weighted(SLOT_WEIGHTS);
    const bases = Object.values(ITEM_BASES).filter((b) => b.slot === slot);
    base = rng.pick(bases);
    if (rarity === 'stamped') authored = rng.pick(ANCHOR_AFFIXES);
  }

  const quality = RARITY_QUALITY[rarity];
  const [lo, hi] = RARITY_INFO[rarity].affixes;
  const count = lo === hi ? lo : rng.int(lo, hi);
  const affixIds = pickAffixes(rng, base.slot, count, authored);
  const affixes: ItemAffix[] = affixIds.map((id) => ({ id, value: rollAffixValue(rng, AFFIXES[id], ilvl, quality) }));

  const item: Item = {
    id: newItemId(rng),
    baseId: base.id,
    slot: base.slot,
    rarity,
    ilvl,
    name: base.name,
    affixes,
  };
  if (base.weapon) {
    const s = weaponScale(ilvl) * quality;
    const j = rng.range(0.92, 1.08);
    item.weapon = {
      min: Math.max(1, Math.round(base.weapon.min * s * j)),
      max: Math.max(item.weapon?.min ?? 2, Math.round(base.weapon.max * s * j)),
      speed: base.weapon.speed,
    };
    if (item.weapon.max < item.weapon.min) item.weapon.max = item.weapon.min + 1;
  }
  if (base.armor) item.armor = Math.round(base.armor * armorScale(ilvl) * quality * rng.range(0.9, 1.1));

  const leg = legendaryId ? LEGENDARIES[legendaryId] : undefined;
  if (leg) {
    item.legendaryId = leg.id;
    item.name = leg.name;
    if (leg.actId) item.actId = leg.actId;
  } else if (base.actId) item.actId = base.actId;
  else if (rarity === 'graded' && affixes[0]) item.name = `${GRADED_PREFIX[affixes[0].id as AffixId] ?? 'Graded'} ${base.name}`;
  else if (rarity === 'stamped') item.name = `${rng.pick(STAMPED_A)} ${rng.pick(STAMPED_B)} ${base.name}`;

  if (item.actId && !actById(item.actId)) item.actId = undefined;
  return item;
}

/** Replace one enchantment. The unique, if any, stays. Reforge cannot add one. */
export function reforgeAffix(rng: Rng, item: Item, index: number): Item {
  const current = item.affixes[index];
  if (!current) throw new Error('no enchantment');
  const others = item.affixes.filter((_, i) => i !== index).map((a) => a.id);
  const pool = Object.values(AFFIXES).filter((a) => a.slots.includes(item.slot) && !others.includes(a.id) && a.id !== current.id);
  const anchorTaken = others.some((id) => ANCHOR_AFFIXES.includes(id as AffixId));
  const usable = pool.filter((a) => !(anchorTaken && ANCHOR_AFFIXES.includes(a.id)));
  const nextId = (usable.length ? rng.weighted(usable.map((a) => [a.id, a.weight] as const)) : current.id) as AffixId;
  const affixes = item.affixes.slice();
  affixes[index] = { id: nextId, value: rollAffixValue(rng, AFFIXES[nextId], item.ilvl, RARITY_QUALITY[item.rarity]) };
  return { ...item, affixes, enchanted: index, legendaryId: item.legendaryId };
}

export function salvageDust(item: Item): number {
  return RARITY_INFO[item.rarity].salvageDust;
}

export interface DropContext {
  tier: EliteTier;
  dropMult: number;
  shardMult: number;
  monsterLevel: number;
  rewardBonus: number;
  reliquaryMult: number;
  shardFind: number;
  mutator: boolean;
}

export interface DropResult {
  items: Item[];
  shardPiles: number[];
  globe: boolean;
}

const BASE_ITEM_CHANCE = 0.12;

export function rollDrops(rng: Rng, ctx: DropContext): DropResult {
  const items: Item[] = [];
  const shardPiles: number[] = [];
  const ilvl = ctx.monsterLevel;
  let itemRolls = 0;
  if (ctx.tier === 'normal') itemRolls = rng.chance(BASE_ITEM_CHANCE * ctx.dropMult) ? 1 : 0;
  else if (ctx.tier === 'champion') itemRolls = rng.int(1, 2);
  else if (ctx.tier === 'rare') itemRolls = rng.int(2, 3);
  else itemRolls = rng.int(3, 5);

  for (let i = 0; i < itemRolls; i++) {
    items.push(rollItem(rng, { ilvl, rarity: rollRarity(rng, ctx.reliquaryMult, ctx.tier), mutator: ctx.mutator }));
  }
  if (ctx.tier === 'boss' && !items.some((i) => i.rarity === 'reliquary') && rng.chance(0.45)) {
    items.push(rollItem(rng, { ilvl, rarity: 'reliquary', mutator: ctx.mutator }));
  }

  const shardChance = ctx.tier === 'normal' ? 0.35 * Math.max(0.4, ctx.shardMult) : 1;
  const piles = ctx.tier === 'boss' ? 4 : ctx.tier === 'rare' ? 2 : 1;
  for (let i = 0; i < piles; i++) {
    if (!rng.chance(shardChance)) continue;
    const amount = Math.round((2 + 3 * rng.next()) * (1 + 0.25 * (ctx.monsterLevel - 1)) * (1 + ctx.rewardBonus) * (1 + ctx.shardFind));
    shardPiles.push(Math.max(1, amount));
  }
  const globe = ctx.tier !== 'normal' || rng.chance(0.07);
  return { items, shardPiles, globe };
}

/** What the camp buyer pays. Equipped gear is not for sale. */
export function sellValue(item: Item): number {
  return Math.max(1, Math.round(RARITY_INFO[item.rarity].sellShards * (1 + 0.12 * (item.ilvl - 1))));
}
