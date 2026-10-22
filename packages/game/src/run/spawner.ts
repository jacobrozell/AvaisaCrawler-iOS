// Populates a generated mine with packs, elites and the occasional Tithe-Runner.

import {
  ELITE_AFFIXES,
  ELITE_NAME_PARTS,
  PACK_TABLE,
  type DungeonLayout,
  type EliteAffixId,
  type Rng,
} from '../bridge.js';
import type { Monster } from '../sim/entities.js';
import type { Simulation } from '../sim/Simulation.js';

export interface SpawnSummary {
  monsters: number;
  echoTotal: number;
  elites: number;
}

export function populateDungeon(sim: Simulation, layout: DungeonLayout, rng: Rng, density = 1, lesson = false): SpawnSummary {
  let echoTotal = 0;
  let count = 0;
  let elites = 0;
  const spots = layout.packSpots.filter(
    (p) => Math.hypot(p.x - layout.start.x, p.y - layout.start.y) > (lesson ? 5 : 9) &&
      Math.hypot(p.x - layout.bossRoom.cx, p.y - layout.bossRoom.cy) > 3,
  );

  const add = (m: Monster): void => {
    echoTotal += m.def.echo * (m.tier === 'champion' ? 4 : m.tier === 'rare' ? 6 : m.tier === 'minion' ? 2 : 1);
    count++;
  };

  if (lesson) {
    for (const spot of spots) {
      const ids = rng.chance(0.3) ? ['mite', 'mite', 'mite'] : ['thrall', 'thrall'];
      for (const id of ids) add(sim.spawnMonster(id, sim.scatter(spot, 1.3)));
    }
    return { monsters: count, echoTotal, elites };
  }

  for (const spot of spots) {
    const roll = rng.next();
    if (roll < 0.09 * density) {
      spawnChampionPack(sim, spot, rng).forEach(add);
      elites++;
    } else if (roll < 0.15 * density) {
      spawnRarePack(sim, spot, rng).forEach(add);
      elites++;
    } else {
      const pack = rng.weighted(PACK_TABLE);
      const n = Math.max(1, Math.round(pack.length * density));
      for (let i = 0; i < n; i++) add(sim.spawnMonster(pack[i % pack.length]!, sim.scatter(spot, 1.6)));
    }
  }

  if (spots.length > 4 && rng.chance(0.35)) {
    const spot = spots[rng.int(Math.floor(spots.length / 3), spots.length - 1)]!;
    add(sim.spawnMonster('tithe_runner', spot));
  }
  return { monsters: count, echoTotal, elites };
}

function rollAffixes(rng: Rng, n: number): EliteAffixId[] {
  const all = Object.keys(ELITE_AFFIXES) as EliteAffixId[];
  return rng.shuffle(all.slice()).slice(0, n);
}

export function eliteName(rng: Rng): string {
  return `${rng.pick(ELITE_NAME_PARTS.first)} ${rng.pick(ELITE_NAME_PARTS.epithet)}`;
}

/** Champion pack: 3–4 tough monsters sharing two affixes. */
export function spawnChampionPack(sim: Simulation, at: { x: number; y: number }, rng: Rng): Monster[] {
  const affixes = rollAffixes(rng, 2);
  const type = rng.pick(['initiate', 'deserter', 'crawler', 'chanter']);
  const n = type === 'deserter' ? 3 : 4;
  const out: Monster[] = [];
  for (let i = 0; i < n; i++) out.push(sim.spawnMonster(type, sim.scatter(at, 1.4), { tier: 'champion', affixes }));
  return out;
}

/** Rare pack: a named leader with three affixes and a retinue of minions. */
export function spawnRarePack(sim: Simulation, at: { x: number; y: number }, rng: Rng): Monster[] {
  const affixes = rollAffixes(rng, 3);
  const type = rng.pick(['initiate', 'deserter', 'chanter']);
  const out: Monster[] = [sim.spawnMonster(type, at, { tier: 'rare', affixes, name: eliteName(rng) })];
  const minion = type === 'chanter' ? 'thrall' : 'initiate';
  for (let i = 0; i < 4; i++) out.push(sim.spawnMonster(minion, sim.scatter(at, 1.8), { tier: 'minion' }));
  return out;
}
