// Local idle pay from the last session until now. Capped. Never a score.
// At the cap it pays fewer shards and less dust than one Surface clear, and nothing above Graded.

import { Rng } from '../math.js';
import type { Item } from './character.js';
import { rollItem } from './loot.js';

export const NIGHT_CAP_MS = 4 * 60 * 60 * 1000;
/** A Surface clear's shard and dust haul, used as the ceiling the night shift must stay under. */
export const SURFACE_CLEAR_SHARDS = 70;
export const SURFACE_CLEAR_DUST = 10;

const CAP_SHARDS = 26;
const CAP_DUST = 4;

export interface NightPay {
  shards: number;
  dust: number;
  items: Item[];
  capped: boolean;
  elapsedMs: number;
}

export function nightShiftPay(elapsedMs: number, rng: Rng, ilvl: number): NightPay {
  const elapsed = Math.max(0, elapsedMs);
  const capped = elapsed >= NIGHT_CAP_MS;
  const t = Math.min(1, elapsed / NIGHT_CAP_MS);
  if (t <= 0) return { shards: 0, dust: 0, items: [], capped: false, elapsedMs: 0 };
  let dust = Math.round(CAP_DUST * t);
  const shards = Math.round(CAP_SHARDS * t);
  const items: Item[] = [];
  const graded = t >= 1 ? 2 : t >= 0.5 ? 1 : 0;
  for (let i = 0; i < graded; i++) {
    items.push(rollItem(rng, { ilvl: Math.max(1, ilvl), rarity: 'graded', mutator: false }));
  }
  // Scrap is vacuumed into dust. It never enters the pack.
  const scrapRolls = t >= 0.25 ? 2 : 0;
  for (let i = 0; i < scrapRolls; i++) dust += 1;
  return { shards, dust, items, capped, elapsedMs: Math.min(elapsed, NIGHT_CAP_MS) };
}
