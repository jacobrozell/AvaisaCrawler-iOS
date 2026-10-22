// One Flesh-Warden. Version 2 wipes Commodity Era POC saves.

import { ACTS } from '../content/acts.js';
import { ITEM_BASES, type Rarity, type Slot, type WeaponStats } from '../content/items.js';

export const CHARACTER_VERSION = 2;

export interface ItemAffix {
  id: string;
  value: number;
}

export interface Item {
  id: string;
  baseId: string;
  slot: Slot;
  rarity: Rarity;
  ilvl: number;
  name: string;
  weapon?: WeaponStats;
  armor?: number;
  affixes: ItemAffix[];
  legendaryId?: string;
  actId?: string;
  /** Index of the enchantment reforge is allowed to replace again. */
  enchanted?: number;
  /** Seasonal power is off. Leftover stat still applies from the trophy case. */
  retired?: boolean;
  seasonId?: string;
  leftover?: number;
}

export const LOADOUT_KEYS = ['weapon', 'plate', 'artifact0', 'artifact1', 'artifact2', 'charm'] as const;
export type LoadoutKey = (typeof LOADOUT_KEYS)[number];
export type Loadout = Partial<Record<LoadoutKey, Item>>;

export interface WardenStats {
  kills: number;
  deaths: number;
  vessels: number;
  reliquaries: number;
}

/** Fields the sim mutates. The save is this plus camp, season, and rank. */
export interface CharacterData {
  boardName: string;
  level: number;
  xp: number;
  shards: number;
  dust: number;
  equipped: Loadout;
  stats: WardenStats;
}

export function starterWeapon(id = 'starter-weapon'): Item {
  const base = ITEM_BASES.pick_hammer!;
  return {
    id,
    baseId: base.id,
    slot: 'weapon',
    rarity: 'scrap',
    ilvl: 1,
    name: 'Company Pick-Hammer',
    weapon: { ...base.weapon! },
    affixes: [],
  };
}

export function starterPlate(id = 'starter-plate'): Item {
  const base = ITEM_BASES.company_plate!;
  return {
    id,
    baseId: base.id,
    slot: 'plate',
    rarity: 'scrap',
    ilvl: 1,
    name: 'Company Plate',
    armor: base.armor,
    affixes: [],
  };
}

export function starterLoadout(): Loadout {
  return { weapon: starterWeapon(), plate: starterPlate() };
}

/** Run 2 puts one artifact on the bar. Scrap, so the results sheet does not have to explain it. */
export function lessonSeal(): Item {
  const base = ITEM_BASES.ruin_seal!;
  const act = ACTS.ruin!;
  return {
    id: 'lesson-seal',
    baseId: base.id,
    slot: 'artifact',
    rarity: 'scrap',
    ilvl: 1,
    name: 'Lesson Seal',
    affixes: [],
    actId: act.id,
  };
}

const BOARD_RE = /^[A-Za-z0-9][A-Za-z0-9 '.-]{1,15}$/;

export function validBoardName(name: string): boolean {
  const t = name.trim();
  return t.length >= 2 && t.length <= 16 && BOARD_RE.test(t);
}
