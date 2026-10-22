// Tunables shared by the on-device sim and the leaderboard verifier.

export const CONTENT_VERSION = 1;
export const TICK_RATE = 20;
export const TICK_SECONDS = 1 / TICK_RATE;

export const LEVEL_CAP = 20;
export const PACK_CAP = 20;
/** Camp chest. The pack is what you carry into a shaft. */
export const STASH_CAP = 60;

export const PLAYER_RADIUS = 0.42;
export const BASE_MOVE_SPEED = 5.2;
export const PICKUP_RANGE = 2.4;
export const BASE_PICKUP_RADIUS = 1.6;

export const POTION_COOLDOWN = 30;
export const POTION_HEAL_PCT = 0.6;
export const GLOBE_HEAL_PCT = 0.2;

export const DEEP_VEIN_SECONDS = 300;
export const DEEP_VEIN_UNLOCK_LEVEL = 10;

/** Main / three artifacts / draught. Bits are the compact input log. */
export const BTN = { main: 1, a0: 2, a1: 4, a2: 8, draught: 16 } as const;

export type ActionSlot = 'main' | 'a0' | 'a1' | 'a2';
/** Kept so the copied sim can name an action without a skill bar. */
export type SkillSlot = ActionSlot;

export const ACTION_SLOTS: readonly ActionSlot[] = ['main', 'a0', 'a1', 'a2'];

/** Fraction of a shaft's echo total required before the Vessel. Tuned with the balance bot. */
export const ECHO_FILL = { echo: 0.8, deep: 0.7, tutorial: 0.38 } as const;
