// Reliquaries. Core ships in every binary. Seasonal and event powers retire with the season.
// Hooks are the existing proc vocabulary. A weapon unique may also replace the swing.

import type { AnchorStat } from './classes.js';
import { actById, DEFAULT_SWING, type ActDef, type SwingDef } from './acts.js';
import type { AffixId, Slot } from './items.js';
import type { Item } from '../rules/character.js';

export type ProcEffect =
  | { type: 'nova'; coef: number; radius: number; visual: string }
  | { type: 'bleed'; coefPerSec: number; duration: number }
  | { type: 'summon'; monsterId: string; duration: number; max: number }
  | { type: 'buff'; id: string; name: string; duration: number; damagePct?: number; damageReduction?: number; moveSpeedPct?: number; healPct?: number };

export type LegendaryHook =
  | { kind: 'stats'; stats: Partial<Record<AffixId | 'ultimateCdr' | 'resourceGen' | 'secondaryDamage', number>> }
  | { kind: 'onHitProc'; chance: number; effect: ProcEffect; primaryOnly?: boolean; cooldown?: number }
  | { kind: 'onDamagedProc'; chance: number; effect: ProcEffect; cooldown: number }
  | { kind: 'onLowLife'; threshold: number; cooldown: number; effect: ProcEffect }
  | { kind: 'onKillProc'; chance: number; effect: ProcEffect }
  | { kind: 'onShardPickup'; healPct: number }
  | { kind: 'mobility'; cooldownMult: number; arrivalCoef: number; arrivalRadius: number; buff?: ProcEffect };

export type RelicPool = 'core' | 'season' | 'event';

export interface LegendaryDef {
  id: string;
  name: string;
  baseId: string;
  slot: Slot;
  anchor: AnchorStat;
  pool: RelicPool;
  /** Drop weight inside its pool. Seasonal rows are heavier than core. */
  weight: number;
  power: string;
  flavor: string;
  hooks: LegendaryHook[];
  /** When set on a weapon, this replaces the company swing. */
  swing?: SwingDef;
  /** Artifact button. Cost and cooldown live on this act. */
  actId?: string;
}

const arc = (range: number, arcDeg: number, coef: number, echo: number): SwingDef => ({
  kind: 'arc', range, arc: arcDeg, coef, echoOnHit: echo, castTime: 0.42,
});

const shot = (visual: string, coef: number, echo: number, extra: Partial<Extract<SwingDef, { kind: 'projectile' }>> = {}): SwingDef => ({
  kind: 'projectile', speed: 16, range: 9, coef, radius: 0.34, visual, echoOnHit: echo, castTime: 0.38, ...extra,
});

export const LEGENDARIES: Record<string, LegendaryDef> = {
  // ── Core (6) ──────────────────────────────────────────────────────────────
  ulrics_pick_hammer: {
    id: 'ulrics_pick_hammer', name: "Ulric's Pick-Hammer", baseId: 'pick_hammer', slot: 'weapon', anchor: 'flesh', pool: 'core', weight: 1,
    power: 'A wider arc. Hits shatter stone around the target.',
    flavor: 'Forged in Cataracta. Still sends you to his brother for fishing.',
    swing: arc(2.5, 150, 1.35, 9),
    hooks: [{ kind: 'onHitProc', chance: 0.2, cooldown: 0.35, effect: { type: 'nova', coef: 2.0, radius: 2.4, visual: 'shatter' } }],
  },
  suformins_fang: {
    id: 'suformins_fang', name: "Suformin's Fang", baseId: 'fang_knife', slot: 'weapon', anchor: 'earth', pool: 'core', weight: 1,
    power: 'The swing is two fangs. Hits may call a wolf.',
    flavor: 'Not the huntress’s dagger. Close enough for the pit.',
    swing: shot('fang', 0.72, 6, { count: 2, spread: 12 }),
    hooks: [{ kind: 'onHitProc', chance: 0.12, cooldown: 1, effect: { type: 'summon', monsterId: 'spirit_wolf', duration: 6, max: 3 } }],
  },
  dentros_last_stand: {
    id: 'dentros_last_stand', name: "Dentros' Last Stand", baseId: 'plate_cuirass', slot: 'plate', anchor: 'flesh', pool: 'core', weight: 1,
    power: 'Below 30% life, gain a ward and a heal. Once a minute.',
    flavor: 'He stood between the recruit and the dark bolt. The plate remembers.',
    hooks: [{ kind: 'onLowLife', threshold: 0.3, cooldown: 60, effect: { type: 'buff', id: 'last_stand', name: 'Last Stand', duration: 4, damageReduction: 0.5, healPct: 0.2 } }],
  },
  thekias_ledger: {
    id: 'thekias_ledger', name: "Thekia's Ledger", baseId: 'ledger_charm', slot: 'charm', anchor: 'sky', pool: 'core', weight: 1,
    power: 'Artifacts cost less Echo and recharge faster.',
    flavor: 'Every rite the council priced, initialed in the margin.',
    hooks: [{ kind: 'stats', stats: { costReduction: 0.25, cooldownReduction: 0.12 } }],
  },
  ruin_rite: {
    id: 'ruin_rite', name: 'Rite of Ruin', baseId: 'ruin_seal', slot: 'artifact', anchor: 'flesh', pool: 'core', weight: 1,
    power: 'Spend Echo on a bleeding half-circle blow.',
    flavor: 'The garrison still teaches this one. The pit taught it first.',
    actId: 'ruin',
    hooks: [],
  },
  garrison_rush: {
    id: 'garrison_rush', name: 'Garrison Rush', baseId: 'rush_token', slot: 'artifact', anchor: 'flesh', pool: 'core', weight: 1,
    power: 'Charge and stun. The rush comes back a little faster.',
    flavor: 'Rotation drill, written on a token so it survives the wearer.',
    actId: 'rush',
    hooks: [{ kind: 'mobility', cooldownMult: 0.8, arrivalCoef: 0, arrivalRadius: 0 }],
  },

  // ── Season 1 (14) ─────────────────────────────────────────────────────────
  red_thread_blade: {
    id: 'red_thread_blade', name: 'Red Thread Blade', baseId: 'chain_blade', slot: 'weapon', anchor: 'flesh', pool: 'season', weight: 3,
    power: 'Main swings bleed.',
    flavor: 'Stitched by the Litany. The warmth under the skin is a feature.',
    swing: arc(2.2, 120, 1.15, 8),
    hooks: [{ kind: 'onHitProc', chance: 1, primaryOnly: true, effect: { type: 'bleed', coefPerSec: 0.4, duration: 3 } }],
  },
  pack_call: {
    id: 'pack_call', name: 'Pack Call', baseId: 'pack_hammer', slot: 'weapon', anchor: 'earth', pool: 'season', weight: 3,
    power: 'The swing calls a wolf instead of striking.',
    flavor: 'Grandmother paid the fountain. The wolf still invoices you.',
    swing: { kind: 'summon', monsterId: 'spirit_wolf', count: 1, duration: 8, echoOnCast: 14, castTime: 0.48 },
    hooks: [],
  },
  choir_needle: {
    id: 'choir_needle', name: 'Choir Needle', baseId: 'needle_knife', slot: 'weapon', anchor: 'sky', pool: 'season', weight: 3,
    power: 'The swing is a piercing needle of choir-light.',
    flavor: 'Ground from a beacon lens. It remembers the note.',
    swing: shot('bolt', 1.15, 7, { pierce: 2, count: 1 }),
    hooks: [],
  },
  bound_mans_sermon: {
    id: 'bound_mans_sermon', name: "The Bound Man's Sermon", baseId: 'pendant_charm', slot: 'charm', anchor: 'flesh', pool: 'season', weight: 3,
    power: 'Generate more Echo from the weapon.',
    flavor: 'Smuggled on broadsheet paper. He agreed with the part about using what we must.',
    hooks: [{ kind: 'stats', stats: { resourceGen: 0.45 } }],
  },
  kimious_collar: {
    id: 'kimious_collar', name: "Kimious' Collar", baseId: 'plate_cuirass', slot: 'plate', anchor: 'sky', pool: 'season', weight: 3,
    power: 'More damage to elites and the Vessel.',
    flavor: 'The last king of Cataracta wore the circlet. The collar is what the pit kept.',
    hooks: [{ kind: 'stats', stats: { eliteDamage: 0.25 } }],
  },
  fountain_coin: {
    id: 'fountain_coin', name: 'Fountain Coin', baseId: 'coin_charm', slot: 'charm', anchor: 'earth', pool: 'season', weight: 3,
    power: 'Shards heal you, and you find more of them.',
    flavor: 'Toss it in a fountain. Nothing happens. Wear it instead.',
    hooks: [{ kind: 'onShardPickup', healPct: 0.03 }, { kind: 'stats', stats: { shardFind: 0.4 } }],
  },
  cellious_pelt: {
    id: 'cellious_pelt', name: "Cellious' Pelt", baseId: 'quilted_coat', slot: 'plate', anchor: 'earth', pool: 'season', weight: 3,
    power: 'Being hit may call a wolf.',
    flavor: 'The gate-wolf turned away a king once.',
    hooks: [{ kind: 'onDamagedProc', chance: 0.15, cooldown: 4, effect: { type: 'summon', monsterId: 'spirit_wolf', duration: 8, max: 2 } }],
  },
  messengers_broadsheet: {
    id: 'messengers_broadsheet', name: "The Messenger's Broadsheet", baseId: 'chain_charm', slot: 'charm', anchor: 'sky', pool: 'season', weight: 3,
    power: 'Kills sometimes grant Legend.',
    flavor: 'HERO OF THE COALITION DENIES RELIQUARY. Price: one shard.',
    hooks: [{ kind: 'onKillProc', chance: 0.08, effect: { type: 'buff', id: 'legend', name: 'Legend', duration: 6, damagePct: 0.25, moveSpeedPct: 0.2 } }],
  },
  ring_of_malkos: {
    id: 'ring_of_malkos', name: 'Ring of Malkos', baseId: 'malkos_band', slot: 'artifact', anchor: 'sky', pool: 'season', weight: 3,
    power: 'Blink, and the landing erupts.',
    flavor: 'A pocket node. Surveyors call it a replica.',
    actId: 'malkos',
    hooks: [{ kind: 'mobility', cooldownMult: 0.7, arrivalCoef: 2.6, arrivalRadius: 2.6 }],
  },
  relay_lens: {
    id: 'relay_lens', name: 'Relay Lens', baseId: 'lens_shard', slot: 'artifact', anchor: 'sky', pool: 'season', weight: 3,
    power: 'A piercing bolt. Artifacts hit harder.',
    flavor: 'Sees the price of a swing before you spend it.',
    actId: 'lens',
    hooks: [{ kind: 'stats', stats: { secondaryDamage: 0.3 } }],
  },
  stonebend_charm: {
    id: 'stonebend_charm', name: 'Stonebend Charm', baseId: 'ledger_charm', slot: 'charm', anchor: 'earth', pool: 'season', weight: 3,
    power: 'Ultimate artifacts recharge faster.',
    flavor: 'Sealed in mage blood. Cobbled into a charm by a quartermaster.',
    hooks: [{ kind: 'stats', stats: { ultimateCdr: 0.35 } }],
  },
  ofelos_treaty: {
    id: 'ofelos_treaty', name: 'Ofelos Treaty', baseId: 'treaty_badge', slot: 'artifact', anchor: 'sky', pool: 'season', weight: 3,
    power: 'March through them. The march leaves you hitting harder.',
    flavor: 'Neutral no longer. They march where the money goes.',
    actId: 'treaty',
    hooks: [{ kind: 'mobility', cooldownMult: 1, arrivalCoef: 0, arrivalRadius: 0, buff: { type: 'buff', id: 'treaty', name: 'Treaty March', duration: 4, damagePct: 0.22 } }],
  },
  cataracta_bloom: {
    id: 'cataracta_bloom', name: 'Cataracta Bloom', baseId: 'bloom_seed', slot: 'artifact', anchor: 'earth', pool: 'season', weight: 3,
    power: 'Spend Echo. Crystal erupts where you aim.',
    flavor: 'Blue crystal, priced like ore, behaving like a grudge.',
    actId: 'bloom',
    hooks: [],
  },
  plate_quake: {
    id: 'plate_quake', name: 'Plate Quake', baseId: 'quake_ingot', slot: 'artifact', anchor: 'flesh', pool: 'season', weight: 3,
    power: 'Spend a heap of Echo. The floor answers.',
    flavor: 'Drive the plate down. The seam drives back.',
    actId: 'quake',
    hooks: [],
  },

  // ── Night Seam event (3). Only while the mutator flag is on. ─────────────
  night_seam_lantern: {
    id: 'night_seam_lantern', name: 'Night-Seam Lantern', baseId: 'lantern_charm', slot: 'charm', anchor: 'sky', pool: 'event', weight: 5,
    power: 'A small, stubborn increase to damage.',
    flavor: 'It burns without oil for as long as the seam is open.',
    hooks: [{ kind: 'stats', stats: { damagePct: 0.12, pickupRadius: 0.8 } }],
  },
  vein_tithe_knife: {
    id: 'vein_tithe_knife', name: 'Vein-Tithe Knife', baseId: 'needle_knife', slot: 'weapon', anchor: 'flesh', pool: 'event', weight: 5,
    power: 'The swing is a fast tithe of knives.',
    flavor: 'The vein collects. So do you.',
    swing: shot('fang', 0.62, 5, { count: 3, spread: 18 }),
    hooks: [],
  },
  muttermite_charm: {
    id: 'muttermite_charm', name: 'Muttermite Charm', baseId: 'mite_token', slot: 'artifact', anchor: 'earth', pool: 'event', weight: 5,
    power: 'Spend Echo to spill mites that bite for you.',
    flavor: 'They were already in the seam. The charm only admits it.',
    actId: 'mites',
    hooks: [],
  },
};

export function itemHooks(item: Item | undefined): LegendaryHook[] {
  if (!item?.legendaryId || item.retired) return [];
  return LEGENDARIES[item.legendaryId]?.hooks ?? [];
}

export function swingFor(weapon: Item | undefined): SwingDef {
  if (!weapon || weapon.retired) return DEFAULT_SWING;
  const leg = weapon.legendaryId ? LEGENDARIES[weapon.legendaryId] : undefined;
  return leg?.swing ?? DEFAULT_SWING;
}

export function actFor(item: Item | undefined): ActDef | null {
  if (!item || item.retired || item.slot !== 'artifact') return null;
  const leg = item.legendaryId ? LEGENDARIES[item.legendaryId] : undefined;
  return actById(leg?.actId ?? item.actId);
}

export function relicPool(mutator: boolean, slot?: Slot): LegendaryDef[] {
  return Object.values(LEGENDARIES).filter((l) => {
    if (slot && l.slot !== slot) return false;
    if (l.pool === 'event') return mutator;
    return l.pool === 'core' || l.pool === 'season';
  });
}
