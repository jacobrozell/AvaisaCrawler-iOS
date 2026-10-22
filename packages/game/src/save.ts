// The one Warden. Version 2 ignores POC saves. A new season sets the loadout aside.

import { LEGENDARIES } from './content/reliquaries.js';
import { bundledWindow, resolveWindow, seasonPhase, type SeasonWindow } from './content/season.js';
import { Rng } from './math.js';
import { CHARACTER_VERSION, lessonSeal, starterLoadout, validBoardName, type CharacterData, type Item, type LoadoutKey } from './rules/character.js';
import { reforgeAffix, salvageDust, sellValue } from './rules/loot.js';
import { nightShiftPay, type NightPay } from './rules/nightshift.js';
import { PACK_CAP, STASH_CAP } from './constants.js';
import { reforgeCost } from './rules/progression.js';
import { placementFor } from './rules/stats.js';
import type { Replay } from './wire.js';

export interface Save extends CharacterData {
  version: number;
  id: string;
  inventory: Item[];
  /** Camp chest. Not carried into the shaft until you move it to the pack. */
  stash: Item[];
  trophy: Item[];
  /** Previous season's worn gear. View-only until that season has ended. */
  setAside: Item[];
  /** Graded and better, waiting on the results sheet. Scrap never lands here. */
  pendingBag: Item[] | null;
  tutorial: 0 | 1 | 2 | 3;
  handedness: 'right' | 'left';
  pressure: number;
  seasonId: string;
  /** Last fetched window. Null until the first successful fetch. */
  seasonWindow: SeasonWindow | null;
  rankedBest: { depth: number; ticks: number } | null;
  /** The one unsent clear. Replaced only by a better clear. */
  pendingReplay: Replay | null;
  lastSessionAt: number;
  unclaimedNight: NightPay | null;
  createdAt: number;
}

export function newSave(now = Date.now()): Save {
  const window = bundledWindow(now);
  return {
    version: CHARACTER_VERSION,
    id: 'warden',
    boardName: '',
    level: 1,
    xp: 0,
    shards: 0,
    dust: 0,
    equipped: starterLoadout(),
    inventory: [],
    stash: [],
    trophy: [],
    setAside: [],
    pendingBag: null,
    tutorial: 0,
    handedness: 'right',
    pressure: 0,
    seasonId: window.id,
    seasonWindow: null,
    rankedBest: null,
    pendingReplay: null,
    lastSessionAt: now,
    unclaimedNight: null,
    stats: { kills: 0, deaths: 0, vessels: 0, reliquaries: 0 },
    createdAt: now,
  };
}

/** Anything that is not version 2 — including a POC character — starts a new Warden. */
export function loadSave(raw: unknown, now = Date.now()): Save {
  if (!raw || typeof raw !== 'object') return newSave(now);
  const save = raw as Save;
  if (save.version !== CHARACTER_VERSION || save.id !== 'warden') return newSave(now);
  if (!Array.isArray(save.stash)) save.stash = [];
  if (!Array.isArray(save.inventory)) save.inventory = [];
  return save;
}

export function activeWindow(save: Save, now: number): SeasonWindow {
  return resolveWindow(save.seasonWindow, now);
}

function asTrophy(item: Item, seasonId: string): Item | null {
  if (!item.legendaryId) return null;
  const leg = LEGENDARIES[item.legendaryId];
  if (!leg || leg.pool === 'core') return null;
  if (item.retired) return item;
  return {
    ...item,
    retired: true,
    seasonId: item.seasonId ?? seasonId,
    leftover: 2 + Math.floor(item.ilvl / 4),
    actId: undefined,
  };
}

function takeSeasonal(items: Item[], seasonId: string, trophy: Item[]): Item[] {
  const keep: Item[] = [];
  for (const item of items) {
    const retired = asTrophy(item, seasonId);
    if (retired) trophy.push(retired);
    else keep.push(item);
  }
  return keep;
}

export function syncSeason(save: Save, window: SeasonWindow, now: number): string[] {
  const notes: string[] = [];
  const phase = seasonPhase(window, now);
  if (save.seasonId !== window.id && phase !== 'ended') {
    const trophy = save.trophy.slice();
    const worn = takeSeasonal(Object.values(save.equipped).filter((i): i is Item => !!i), window.id, trophy);
    const packed = takeSeasonal(save.inventory, window.id, trophy);
    const stored = takeSeasonal(save.stash, window.id, trophy);
    const aside = takeSeasonal(save.setAside, window.id, trophy);
    save.trophy = trophy;
    save.setAside = [...aside, ...worn, ...packed, ...stored];
    save.inventory = [];
    save.stash = [];
    save.pendingBag = null;
    save.equipped = starterLoadout();
    save.rankedBest = null;
    save.pendingReplay = null;
    save.seasonId = window.id;
    notes.push('A new season. The last loadout is set aside, and you start with company issue.');
  } else if (phase === 'ended') {
    const trophy = save.trophy.slice();
    const before = trophy.length;
    for (const key of Object.keys(save.equipped) as LoadoutKey[]) {
      const item = save.equipped[key];
      if (!item) continue;
      const retired = asTrophy(item, save.seasonId);
      if (retired) {
        trophy.push(retired);
        delete save.equipped[key];
      }
    }
    save.inventory = takeSeasonal(save.inventory, save.seasonId, trophy);
    save.stash = takeSeasonal(save.stash, save.seasonId, trophy);
    save.setAside = takeSeasonal(save.setAside, save.seasonId, trophy);
    if (trophy.length > before) notes.push('Seasonal powers are in the trophy case. They are off. A little Flesh remains.');
    save.trophy = trophy;
  }
  if (phase === 'retiring') notes.push('Seasonal powers retire in the last week of the season.');
  save.seasonWindow = window;
  save.seasonId = window.id === save.seasonId ? save.seasonId : save.seasonId;
  if (save.seasonId !== window.id && phase === 'ended') {
    // The fetched season is already over and was never started. Keep the warden on the old id.
  } else if (phase !== 'ended') save.seasonId = window.id;
  return notes;
}

export function markAway(save: Save, now: number): void {
  if (!save.unclaimedNight) save.lastSessionAt = now;
}

export function noteNight(save: Save, now: number): void {
  if (save.unclaimedNight) return;
  const elapsed = now - save.lastSessionAt;
  if (elapsed < 60_000) return;
  save.unclaimedNight = nightShiftPay(elapsed, new Rng(save.lastSessionAt >>> 0 || 1), save.level);
}

export function claimNight(save: Save, now: number): NightPay | null {
  const pay = save.unclaimedNight;
  if (!pay) return null;
  save.shards += pay.shards;
  save.dust += pay.dust;
  if (pay.items.length) save.pendingBag = [...(save.pendingBag ?? []), ...pay.items];
  save.unclaimedNight = null;
  save.lastSessionAt = now;
  return pay;
}

export function packCount(save: Save): number {
  return save.inventory.length;
}

export function stashCount(save: Save): number {
  return save.stash.length;
}

/** Move a packed item into the camp chest. */
export function storeItem(save: Save, id: string): boolean {
  if (save.stash.length >= STASH_CAP) return false;
  const idx = save.inventory.findIndex((item) => item.id === id);
  if (idx < 0) return false;
  const [item] = save.inventory.splice(idx, 1);
  if (!item) return false;
  save.stash.push(item);
  return true;
}

/** Move a stashed item back into the pack. */
export function withdrawItem(save: Save, id: string): boolean {
  if (save.inventory.length >= PACK_CAP) return false;
  const idx = save.stash.findIndex((item) => item.id === id);
  if (idx < 0) return false;
  const [item] = save.stash.splice(idx, 1);
  if (!item) return false;
  save.inventory.push(item);
  return true;
}

/** The buyer pays shards for packed items. Worn gear stays on. */
export function sellItems(save: Save, ids: readonly string[]): number {
  const drop = new Set(ids);
  let shards = 0;
  const keep: Item[] = [];
  for (const item of save.inventory) {
    if (!drop.has(item.id)) {
      keep.push(item);
      continue;
    }
    shards += sellValue(item);
  }
  save.inventory = keep;
  save.shards += shards;
  return shards;
}

/** After the season, set-aside core gear can come back into the pack. */
export function reclaimSetAside(save: Save): number {
  let moved = 0;
  const left: Item[] = [];
  for (const item of save.setAside) {
    if (keepItem(save, item)) moved++;
    else left.push(item);
  }
  save.setAside = left;
  return moved;
}

export function equipItem(save: Save, item: Item): Item | null {
  const slot = placementFor(save.level, save.equipped, item);
  const prev = save.equipped[slot];
  save.equipped[slot] = item;
  if (prev && prev.rarity !== 'scrap') return prev;
  if (prev) save.dust += salvageDust(prev);
  return null;
}

export function keepItem(save: Save, item: Item): boolean {
  if (save.inventory.length >= PACK_CAP) return false;
  save.inventory.push(item);
  return true;
}

export function salvageInto(save: Save, item: Item): void {
  save.dust += salvageDust(item);
}

export function tryReforge(save: Save, itemId: string, index: number, rng: Rng): string | null {
  const located = findItem(save, itemId);
  if (!located) return 'That item is not in camp.';
  const item = located.item;
  if (!item.affixes[index]) return 'No enchantment there.';
  if (item.enchanted !== undefined && item.enchanted !== index) return 'Reforge already chose a different enchantment.';
  const cost = reforgeCost(item.ilvl);
  if (save.shards < cost.shards || save.dust < cost.dust) return 'Not enough shards or dust.';
  const before = item.legendaryId;
  const next = reforgeAffix(rng, item, index);
  if (next.legendaryId !== before) return 'Reforge cannot change a unique.';
  save.shards -= cost.shards;
  save.dust -= cost.dust;
  located.put(next);
  return null;
}

export function setBoardName(save: Save, name: string): string | null {
  const trimmed = name.trim();
  if (!validBoardName(trimmed)) return 'Use 2–16 letters, numbers, spaces, apostrophes, or hyphens.';
  save.boardName = trimmed;
  return null;
}

export function ensureLessonSeal(save: Save): void {
  if (save.equipped.artifact0 || save.equipped.artifact1 || save.equipped.artifact2) return;
  save.equipped.artifact0 = lessonSeal();
}

function findItem(save: Save, id: string): { item: Item; put: (next: Item) => void } | null {
  for (const key of Object.keys(save.equipped) as LoadoutKey[]) {
    const item = save.equipped[key];
    if (item?.id === id) return { item, put: (next) => { save.equipped[key] = next; } };
  }
  const idx = save.inventory.findIndex((i) => i.id === id);
  if (idx >= 0) return { item: save.inventory[idx]!, put: (next) => { save.inventory[idx] = next; } };
  const stashed = save.stash.findIndex((i) => i.id === id);
  if (stashed >= 0) return { item: save.stash[stashed]!, put: (next) => { save.stash[stashed] = next; } };
  return null;
}
