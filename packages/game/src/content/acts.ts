// Weapon swings and artifact buttons. Costs live on the artifact, not on a class skill row.

import type { SkillEffect } from './effects.js';

export type SwingDef =
  | { kind: 'arc'; range: number; arc: number; coef: number; echoOnHit: number; castTime: number }
  | {
      kind: 'projectile';
      speed: number;
      range: number;
      coef: number;
      radius: number;
      count?: number;
      spread?: number;
      pierce?: number;
      visual: string;
      echoOnHit: number;
      castTime: number;
    }
  | { kind: 'summon'; monsterId: string; count: number; duration: number; echoOnCast: number; castTime: number };

export const DEFAULT_SWING: SwingDef = {
  kind: 'arc',
  range: 2.15,
  arc: 110,
  coef: 1.2,
  echoOnHit: 8,
  castTime: 0.42,
};

export interface ActDef {
  id: string;
  name: string;
  /** Echo spent. This is the artifact's cost. */
  cost: number;
  cooldown: number;
  castTime: number;
  tags: Array<'mobility' | 'ultimate'>;
  effects: SkillEffect[];
}

const A = (def: ActDef): ActDef => def;

export const ACTS: Record<string, ActDef> = {
  ruin: A({
    id: 'ruin',
    name: 'Rite of Ruin',
    cost: 28,
    cooldown: 0,
    castTime: 0.5,
    tags: [],
    effects: [{ type: 'melee', range: 2.8, arc: 170, coef: 3.2, applies: { kind: 'bleed', coefPerSec: 0.35, duration: 3 } }],
  }),
  rush: A({
    id: 'rush',
    name: 'Shield Rush',
    cost: 0,
    cooldown: 8,
    castTime: 0.22,
    tags: ['mobility'],
    effects: [{ type: 'dash', distance: 6.5, coef: 1.7, radius: 1.25, applies: { kind: 'stun', duration: 0.7 }, visual: 'rush' }],
  }),
  holding: A({
    id: 'holding',
    name: 'Chant of Holding',
    cost: 0,
    cooldown: 18,
    castTime: 0.2,
    tags: [],
    effects: [
      { type: 'buff', buff: { id: 'chant_of_holding', name: 'Chant of Holding', duration: 6, damageReduction: 0.35, damagePct: 0.15 } },
      { type: 'aoeSelf', radius: 3.6, coef: 0, applies: { kind: 'slow', pct: 0.4, duration: 2.5 }, visual: 'chant' },
    ],
  }),
  quake: A({
    id: 'quake',
    name: 'Plate Quake',
    cost: 40,
    cooldown: 22,
    castTime: 0.55,
    tags: ['ultimate'],
    effects: [{ type: 'aoeSelf', radius: 4.6, coef: 5.4, applies: { kind: 'stun', duration: 1.2 }, visual: 'quake' }],
  }),
  bloom: A({
    id: 'bloom',
    name: 'Cataracta Bloom',
    cost: 32,
    cooldown: 1.2,
    castTime: 0.45,
    tags: [],
    effects: [{ type: 'aoeTarget', radius: 2.8, coef: 3.4, maxRange: 9, delay: 0.3, applies: { kind: 'slow', pct: 0.35, duration: 2 }, visual: 'bloom' }],
  }),
  lens: A({
    id: 'lens',
    name: 'Relay Lens',
    cost: 18,
    cooldown: 0.6,
    castTime: 0.32,
    tags: [],
    effects: [{ type: 'projectile', speed: 18, range: 11, coef: 2.1, radius: 0.3, pierce: 2, visual: 'bolt' }],
  }),
  malkos: A({
    id: 'malkos',
    name: 'Malkos Step',
    cost: 0,
    cooldown: 9,
    castTime: 0.16,
    tags: ['mobility'],
    effects: [{ type: 'dash', distance: 7, coef: 0.4, radius: 1.1, blink: true, visual: 'blink' }],
  }),
  treaty: A({
    id: 'treaty',
    name: 'Treaty March',
    cost: 0,
    cooldown: 10,
    castTime: 0.2,
    tags: ['mobility'],
    effects: [{ type: 'dash', distance: 5.5, coef: 1.2, radius: 1.1, visual: 'rush' }],
  }),
  mites: A({
    id: 'mites',
    name: 'Muttermites',
    cost: 22,
    cooldown: 14,
    castTime: 0.35,
    tags: [],
    effects: [{ type: 'summon', monsterId: 'mite', count: 3, duration: 8 }],
  }),
};

export function actById(id: string | undefined): ActDef | null {
  return id ? ACTS[id] ?? null : null;
}
