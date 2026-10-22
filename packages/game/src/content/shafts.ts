// Echo Shaft pressure and Deep Vein scaling. No town, no story shaft.

export interface PressureTier {
  id: number;
  name: string;
  lifeMult: number;
  damageMult: number;
  rewardBonus: number;
  reliquaryMult: number;
  minLevel: number;
}

export const PRESSURE_TIERS: readonly PressureTier[] = [
  { id: 0, name: 'Surface', lifeMult: 5, damageMult: 0.8, rewardBonus: 0, reliquaryMult: 1, minLevel: 1 },
  { id: 1, name: 'Shallow', lifeMult: 6.5, damageMult: 1.3, rewardBonus: 0.25, reliquaryMult: 1.2, minLevel: 4 },
  { id: 2, name: 'Deep', lifeMult: 8.5, damageMult: 1.65, rewardBonus: 0.55, reliquaryMult: 1.45, minLevel: 8 },
  { id: 3, name: 'Abyssal I', lifeMult: 11.5, damageMult: 2.2, rewardBonus: 0.9, reliquaryMult: 1.8, minLevel: 12 },
  { id: 4, name: 'Abyssal II', lifeMult: 16, damageMult: 2.9, rewardBonus: 1.3, reliquaryMult: 2.2, minLevel: 16 },
  { id: 5, name: 'Abyssal III', lifeMult: 22, damageMult: 3.8, rewardBonus: 1.8, reliquaryMult: 2.8, minLevel: 20 },
];

export function deepVeinScaling(depth: number): { lifeMult: number; damageMult: number; rewardBonus: number; reliquaryMult: number } {
  return {
    lifeMult: 1.8 * Math.pow(1.16, depth - 1),
    damageMult: 1.25 * Math.pow(1.08, depth - 1),
    rewardBonus: 0.4 + depth * 0.12,
    reliquaryMult: 1.4 + depth * 0.08,
  };
}

export type ShaftKind = 'tutorial' | 'echo' | 'deep';

export function shaftSize(kind: ShaftKind): { width: number; height: number; rooms: number } {
  if (kind === 'tutorial') return { width: 44, height: 36, rooms: 4 };
  return { width: 92, height: 80, rooms: 11 };
}
