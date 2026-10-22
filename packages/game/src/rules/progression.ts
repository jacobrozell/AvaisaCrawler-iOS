// Level cap stays 20. A season is not a level grind, so the curve is short.
// There is no renown track, battle pass, stamina, or paid power.

import { LEVEL_CAP } from '../constants.js';

export function xpToNext(level: number): number {
  return Math.round(40 * Math.pow(level, 1.35));
}

export function killXp(base: number, monsterLevel: number, rewardBonus: number): number {
  return Math.round(base * (1 + 0.22 * (monsterLevel - 1)) * (1 + rewardBonus));
}

export interface XpResult {
  level: number;
  xp: number;
  levelsGained: number;
}

export function applyXp(level: number, xp: number, gained: number): XpResult {
  let levelsGained = 0;
  if (level >= LEVEL_CAP || gained <= 0) return { level, xp, levelsGained };
  xp += gained;
  while (level < LEVEL_CAP && xp >= xpToNext(level)) {
    xp -= xpToNext(level);
    level++;
    levelsGained++;
  }
  if (level >= LEVEL_CAP) xp = 0;
  return { level, xp, levelsGained };
}

export function reforgeCost(ilvl: number): { shards: number; dust: number } {
  return { shards: 8 + ilvl * 2, dust: 3 + Math.floor(ilvl / 2) };
}
