// Events the sim emits for the local renderer. There is no network codec.

import type { ActionSlot } from './constants.js';

export type EntityKind = 'player' | 'monster' | 'pet' | 'projectile' | 'item' | 'shards' | 'globe' | 'zone';

export interface EntitySpawn {
  id: number;
  k: EntityKind;
  x: number;
  y: number;
  r: number;
  name?: string;
  level?: number;
  monsterId?: string;
  elite?: 'champion' | 'rare' | 'boss' | 'minion';
  affixes?: string[];
  rarity?: string;
  amount?: number;
  visual?: string;
  ownerId?: number;
  vx?: number;
  vy?: number;
  dur?: number;
}

export type EntityUpdate = [number, number, number, number, number, number];

export const STATE = {
  dead: 1,
  winding: 2,
  stunned: 4,
  slowed: 8,
  immune: 16,
  surge: 32,
  dot: 64,
  shielded: 128,
} as const;

export type GameEvent =
  | { t: 'dmg'; id: number; a: number; c?: 1; s?: number; x: number; y: number }
  | { t: 'heal'; id: number; a: number }
  | { t: 'cast'; id: number; v: string; x: number; y: number; tx: number; ty: number }
  | { t: 'fx'; v: string; x: number; y: number; r?: number; tx?: number; ty?: number }
  | { t: 'tele'; x: number; y: number; r: number; d: number; tx?: number; ty?: number; w?: number }
  | { t: 'die'; id: number; x: number; y: number }
  | { t: 'lvl'; id: number }
  | { t: 'say'; id: number; text: string };

export type { ActionSlot };
