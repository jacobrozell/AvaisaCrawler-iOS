// The leaderboard function's whole opinion: rerun the sim, write a row only on a match.

import { playback, type ShaftOptions } from './run/shaft.js';
import { newSave, type Save } from './save.js';
import { beatsBest, type RankRow, type Replay } from './wire.js';

export interface JudgeExpect {
  contentVersion: number;
  seasonId: string;
  endsAt: number;
  now: number;
}

export type JudgeResult =
  | { ok: true; depth: number; ticks: number }
  | { ok: false; reason: 'version' | 'season' | 'closed' | 'mismatch' };

export function judgeReplay(replay: Replay, expect: JudgeExpect): JudgeResult {
  if (replay.contentVersion !== expect.contentVersion) return { ok: false, reason: 'version' };
  if (replay.seasonId !== expect.seasonId) return { ok: false, reason: 'season' };
  if (!(expect.now < expect.endsAt)) return { ok: false, reason: 'closed' };
  const save = saveFromReplay(replay);
  const opts: ShaftOptions = {
    kind: 'deep',
    seed: replay.seed,
    pressure: replay.pressure,
    depth: replay.depth,
    ranked: true,
    mutator: replay.mutator,
    seasonId: replay.seasonId,
  };
  const run = playback(save, opts, replay.inputs, replay.ticks);
  if (run.outcome !== 'clear' || run.clearTick !== replay.ticks) return { ok: false, reason: 'mismatch' };
  return { ok: true, depth: replay.depth, ticks: replay.ticks };
}

export function acceptSubmission(replay: Replay, stored: RankRow | null, expect: JudgeExpect): JudgeResult | { ok: false; reason: 'worse' } {
  const judged = judgeReplay(replay, expect);
  if (!judged.ok) return judged;
  if (!beatsBest(judged, stored)) return { ok: false, reason: 'worse' };
  return judged;
}

function saveFromReplay(replay: Replay): Save {
  const save = newSave(0);
  const w = replay.warden;
  save.boardName = w.boardName;
  save.level = w.level;
  save.xp = w.xp;
  save.shards = w.shards;
  save.dust = w.dust;
  save.equipped = structuredClone(w.equipped);
  save.trophy = structuredClone(w.trophy);
  save.stats = { ...w.stats };
  return save;
}
