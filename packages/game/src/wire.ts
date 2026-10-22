// Replay payload. The verifier reruns this against the same sim.
// The warden snapshot is the start state the sim needs; the rest is the claim.

import type { Item, Loadout, WardenStats } from './rules/character.js';

export interface InputSample {
  /** Sim tick at which the stick, buttons, or lock last changed. */
  t: number;
  mx: number;
  my: number;
  b: number;
  lock: number;
}

export interface WardenSnapshot {
  boardName: string;
  level: number;
  xp: number;
  shards: number;
  dust: number;
  equipped: Loadout;
  trophy: Item[];
  stats: WardenStats;
}

export interface Replay {
  seed: number;
  contentVersion: number;
  seasonId: string;
  /** Deep Vein depth. One ladder: higher depth, then lower ticks. */
  depth: number;
  ticks: number;
  pressure: number;
  /** Drop table flag for this run, so the verifier rolls the same scatter stream. */
  mutator: boolean;
  inputs: InputSample[];
  warden: WardenSnapshot;
}

export interface RankRow {
  depth: number;
  ticks: number;
}

export function beatsBest(next: RankRow, prev: RankRow | null | undefined): boolean {
  if (!prev) return true;
  if (next.depth !== prev.depth) return next.depth > prev.depth;
  return next.ticks < prev.ticks;
}
