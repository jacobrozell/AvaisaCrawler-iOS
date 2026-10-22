// Gear bases, enchantments, and rarity. Rarity is a shape as well as a color.

import type { AnchorStat } from './classes.js';

export type Slot = 'weapon' | 'plate' | 'artifact' | 'charm';
export const SLOTS: readonly Slot[] = ['weapon', 'plate', 'artifact', 'charm'];

export type Rarity = 'scrap' | 'graded' | 'stamped' | 'reliquary';
export const RARITIES: readonly Rarity[] = ['scrap', 'graded', 'stamped', 'reliquary'];

export type RarityShape = 'square' | 'round' | 'diamond' | 'seal';

export const RARITY_INFO: Record<Rarity, { name: string; color: string; shape: RarityShape; affixes: [number, number]; salvageDust: number; sellShards: number }> = {
  scrap: { name: 'Scrap', color: '#c9c3b8', shape: 'square', affixes: [0, 0], salvageDust: 1, sellShards: 2 },
  graded: { name: 'Graded', color: '#5d9cff', shape: 'round', affixes: [1, 2], salvageDust: 3, sellShards: 6 },
  stamped: { name: 'Stamped', color: '#f3d34a', shape: 'diamond', affixes: [3, 4], salvageDust: 8, sellShards: 18 },
  reliquary: { name: 'Reliquary', color: '#ff8a2a', shape: 'seal', affixes: [4, 4], salvageDust: 20, sellShards: 48 },
};

export interface WeaponStats {
  min: number;
  max: number;
  speed: number;
}

export interface ItemBase {
  id: string;
  slot: Slot;
  name: string;
  weapon?: WeaponStats;
  armor?: number;
  icon: string;
  /** Generic artifact button. A reliquary act replaces this. */
  actId?: string;
}

export const ITEM_BASES: Record<string, ItemBase> = {
  pick_hammer: { id: 'pick_hammer', slot: 'weapon', name: 'Pick-Hammer', weapon: { min: 8, max: 12, speed: 1 }, icon: 'hammer' },
  chain_blade: { id: 'chain_blade', slot: 'weapon', name: 'Chain Blade', weapon: { min: 6, max: 10, speed: 1.2 }, icon: 'blade' },
  fang_knife: { id: 'fang_knife', slot: 'weapon', name: 'Fang Knife', weapon: { min: 5, max: 8, speed: 1.45 }, icon: 'knife' },
  pack_hammer: { id: 'pack_hammer', slot: 'weapon', name: 'Pack Hammer', weapon: { min: 7, max: 11, speed: 0.92 }, icon: 'hammer' },
  needle_knife: { id: 'needle_knife', slot: 'weapon', name: 'Needle Knife', weapon: { min: 4, max: 7, speed: 1.5 }, icon: 'knife' },

  company_plate: { id: 'company_plate', slot: 'plate', name: 'Company Plate', armor: 16, icon: 'plate' },
  quilted_coat: { id: 'quilted_coat', slot: 'plate', name: 'Quilted Coat', armor: 12, icon: 'coat' },
  plate_cuirass: { id: 'plate_cuirass', slot: 'plate', name: 'Plate Cuirass', armor: 22, icon: 'cuirass' },

  ruin_seal: { id: 'ruin_seal', slot: 'artifact', name: 'Ruin Seal', icon: 'seal', actId: 'ruin' },
  rush_token: { id: 'rush_token', slot: 'artifact', name: 'Rush Token', icon: 'token', actId: 'rush' },
  holding_bell: { id: 'holding_bell', slot: 'artifact', name: 'Holding Bell', icon: 'bell', actId: 'holding' },
  quake_ingot: { id: 'quake_ingot', slot: 'artifact', name: 'Quake Ingot', icon: 'ingot', actId: 'quake' },
  bloom_seed: { id: 'bloom_seed', slot: 'artifact', name: 'Bloom Seed', icon: 'seed', actId: 'bloom' },
  lens_shard: { id: 'lens_shard', slot: 'artifact', name: 'Lens Shard', icon: 'lens', actId: 'lens' },
  malkos_band: { id: 'malkos_band', slot: 'artifact', name: 'Malkos Band', icon: 'band', actId: 'malkos' },
  treaty_badge: { id: 'treaty_badge', slot: 'artifact', name: 'Treaty Badge', icon: 'badge', actId: 'treaty' },
  mite_token: { id: 'mite_token', slot: 'artifact', name: 'Mite Token', icon: 'token', actId: 'mites' },

  chain_charm: { id: 'chain_charm', slot: 'charm', name: 'Chain Charm', icon: 'charm' },
  pendant_charm: { id: 'pendant_charm', slot: 'charm', name: 'Pendant Charm', icon: 'pendant' },
  coin_charm: { id: 'coin_charm', slot: 'charm', name: 'Coin Charm', icon: 'coin' },
  ledger_charm: { id: 'ledger_charm', slot: 'charm', name: 'Ledger Charm', icon: 'ledger' },
  lantern_charm: { id: 'lantern_charm', slot: 'charm', name: 'Lantern Charm', icon: 'lantern' },
};

export type AffixId =
  | AnchorStat
  | 'vitality'
  | 'critChance'
  | 'critDamage'
  | 'attackSpeed'
  | 'damagePct'
  | 'eliteDamage'
  | 'cooldownReduction'
  | 'costReduction'
  | 'lifeOnHit'
  | 'lifeRegen'
  | 'armor'
  | 'moveSpeed'
  | 'shardFind'
  | 'pickupRadius';

export interface AffixDef {
  id: AffixId;
  label: string;
  format: 'flat' | 'pct' | 'tiles' | 'perSec';
  slots: readonly Slot[];
  min: number;
  max: number;
  perLevel: number;
  cap?: number;
  weight: number;
}

const ALL: readonly Slot[] = SLOTS;

export const AFFIXES: Record<AffixId, AffixDef> = {
  flesh: { id: 'flesh', label: 'Flesh', format: 'flat', slots: ALL, min: 4, max: 7, perLevel: 3.2, weight: 10 },
  earth: { id: 'earth', label: 'Earth', format: 'flat', slots: ALL, min: 4, max: 7, perLevel: 3.2, weight: 10 },
  sky: { id: 'sky', label: 'Sky', format: 'flat', slots: ALL, min: 4, max: 7, perLevel: 3.2, weight: 10 },
  vitality: { id: 'vitality', label: 'Vitality', format: 'flat', slots: ['plate', 'charm', 'artifact'], min: 4, max: 6, perLevel: 2.6, weight: 10 },
  critChance: { id: 'critChance', label: 'Critical Hit Chance', format: 'pct', slots: ['charm', 'artifact'], min: 0.02, max: 0.035, perLevel: 0.0008, cap: 0.06, weight: 7 },
  critDamage: { id: 'critDamage', label: 'Critical Hit Damage', format: 'pct', slots: ['weapon', 'charm', 'artifact'], min: 0.08, max: 0.16, perLevel: 0.008, cap: 0.4, weight: 7 },
  attackSpeed: { id: 'attackSpeed', label: 'Attack Speed', format: 'pct', slots: ['weapon', 'charm', 'artifact'], min: 0.03, max: 0.05, perLevel: 0.001, cap: 0.08, weight: 6 },
  damagePct: { id: 'damagePct', label: 'Damage', format: 'pct', slots: ['weapon', 'charm'], min: 0.04, max: 0.07, perLevel: 0.002, cap: 0.12, weight: 6 },
  eliteDamage: { id: 'eliteDamage', label: 'Damage to Elites', format: 'pct', slots: ['weapon', 'plate', 'charm'], min: 0.05, max: 0.08, perLevel: 0.003, cap: 0.15, weight: 4 },
  cooldownReduction: { id: 'cooldownReduction', label: 'Cooldown Reduction', format: 'pct', slots: ['plate', 'weapon', 'charm'], min: 0.03, max: 0.05, perLevel: 0.0012, cap: 0.08, weight: 5 },
  costReduction: { id: 'costReduction', label: 'Echo Cost Reduction', format: 'pct', slots: ['plate', 'charm'], min: 0.03, max: 0.05, perLevel: 0.0015, cap: 0.08, weight: 4 },
  lifeOnHit: { id: 'lifeOnHit', label: 'Life per Hit', format: 'flat', slots: ['weapon', 'charm', 'artifact'], min: 1, max: 2, perLevel: 0.7, weight: 5 },
  lifeRegen: { id: 'lifeRegen', label: 'Life per Second', format: 'perSec', slots: ['plate', 'charm'], min: 1, max: 2, perLevel: 0.6, weight: 5 },
  armor: { id: 'armor', label: 'Armor', format: 'flat', slots: ['plate'], min: 4, max: 7, perLevel: 2.2, weight: 7 },
  moveSpeed: { id: 'moveSpeed', label: 'Movement Speed', format: 'pct', slots: ['plate'], min: 0.04, max: 0.07, perLevel: 0.002, cap: 0.12, weight: 6 },
  shardFind: { id: 'shardFind', label: 'Shard Find', format: 'pct', slots: ['charm', 'plate'], min: 0.08, max: 0.16, perLevel: 0.005, cap: 0.3, weight: 4 },
  pickupRadius: { id: 'pickupRadius', label: 'Pickup Radius', format: 'tiles', slots: ['charm'], min: 0.4, max: 0.9, perLevel: 0.03, cap: 2, weight: 3 },
};

export const ANCHOR_AFFIXES: readonly AffixId[] = ['flesh', 'earth', 'sky'];

export const weaponScale = (ilvl: number): number => 1 + 0.16 * (ilvl - 1);
export const armorScale = (ilvl: number): number => 1 + 0.2 * (ilvl - 1);
