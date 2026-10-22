// One authored season. The next season is an app update, not a live content service.
// A fetch supplies id, end time, and the mutator flag. Offline play keeps the last fetch.

export const SEASON_ID = 'season-1';
export const SEASON_WEEKS = 8;
export const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
export const SEASON_LENGTH_MS = SEASON_WEEKS * WEEK_MS;
export const RETIRE_WARN_MS = 7 * 24 * 60 * 60 * 1000;
/** 20 Oct 2026, the bundled window until a fetch replaces it. */
export const SEASON_EPOCH = Date.UTC(2026, 9, 20);

export const MUTATOR = {
  id: 'night-seam',
  /** Mid-season, day 28. */
  startOffsetMs: 28 * 24 * 60 * 60 * 1000,
  /** 12 days, inside the 10–14 day authoring rule. */
  durationMs: 12 * 24 * 60 * 60 * 1000,
  dropIds: ['night_seam_lantern', 'vein_tithe_knife', 'muttermite_charm'] as const,
};

export interface SeasonWindow {
  id: string;
  endsAt: number;
  /** Server flag. Offline, this is whatever was last fetched, not a recomputed clock. */
  mutator: boolean;
  fetchedAt?: number;
}

export function mutatorActiveAt(now: number): boolean {
  const start = SEASON_EPOCH + MUTATOR.startOffsetMs;
  return now >= start && now < start + MUTATOR.durationMs;
}

export function bundledWindow(now: number): SeasonWindow {
  return { id: SEASON_ID, endsAt: SEASON_EPOCH + SEASON_LENGTH_MS, mutator: mutatorActiveAt(now) };
}

/** Last fetch wins. With no fetch, the binary's window is the season. */
export function resolveWindow(saved: SeasonWindow | null | undefined, now: number): SeasonWindow {
  return saved ?? bundledWindow(now);
}

export type SeasonPhase = 'live' | 'mutator' | 'retiring' | 'ended';

export function seasonPhase(w: SeasonWindow, now: number): SeasonPhase {
  if (now >= w.endsAt) return 'ended';
  if (w.endsAt - now <= RETIRE_WARN_MS) return 'retiring';
  if (w.mutator) return 'mutator';
  return 'live';
}
