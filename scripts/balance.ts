// Headless balance: three loadouts, Surface Echo Shafts, sim time not wall time.
//   npm run balance
//
// Retune (lifeMult 5, damageMult 0.8, echo fill 0.8), bot with soft-lock at weapon range:
//   Ulric only L10     dies on the first packs (no artifact button)
//   Rite and quake L10 clears 86s and 91s, one death
//   Fang and bloom L10 clears 117s and 117s, one death
// A human clearing, looting, and missing pulls sits longer than this bot.
// The shaft is tuned so those relic clears are the fast end of a few minutes.

import { BTN, TICK_RATE, ShaftRun, newSave, rollItem, type Item, type Save } from '@echo/game';
import { DistanceField } from '../packages/game/src/map/tilemap.ts';
import { Rng } from '../packages/game/src/math.ts';

interface LoadoutSpec {
  name: string;
  level: number;
  relics: string[];
}

const LOADOUTS: LoadoutSpec[] = [
  { name: 'ulric only', level: 10, relics: ['ulrics_pick_hammer'] },
  { name: 'rite and quake', level: 10, relics: ['ulrics_pick_hammer', 'dentros_last_stand', 'thekias_ledger', 'ruin_rite', 'garrison_rush', 'plate_quake'] },
  { name: 'fang and bloom', level: 10, relics: ['suformins_fang', 'cellious_pelt', 'fountain_coin', 'cataracta_bloom', 'ruin_rite', 'garrison_rush'] },
];

function place(save: Save, item: Item): void {
  if (item.slot === 'weapon') save.equipped.weapon = item;
  else if (item.slot === 'plate') save.equipped.plate = item;
  else if (item.slot === 'charm') save.equipped.charm = item;
  else if (!save.equipped.artifact0) save.equipped.artifact0 = item;
  else if (!save.equipped.artifact1) save.equipped.artifact1 = item;
  else save.equipped.artifact2 = item;
}

function makeSave(level: number, relics: string[]): Save {
  const save = newSave(1);
  save.level = level;
  const rng = new Rng(level * 1000 + relics.length);
  for (const id of relics) place(save, rollItem(rng, { ilvl: level, rarity: 'reliquary', legendaryId: id }));
  return save;
}

function play(save: Save, seed: number): { seconds: number; outcome: string; shards: number; dust: number; echo: string } {
  const run = new ShaftRun(save, {
    kind: 'echo', seed, pressure: 0, depth: 0, ranked: false, mutator: false, seasonId: 'season-1',
  });
  const field = new DistanceField(run.sim.map);
  let stuck = 0;
  let bias = 0;
  let lastX = 0;
  let lastY = 0;
  const maxTicks = 8 * 60 * TICK_RATE;
  for (let t = 0; t < maxTicks && !run.outcome; t++) {
    const p = run.player;
    if (t % 10 === 0) {
      let best: { x: number; y: number } | null = null;
      let bestD = 1e12;
      for (const m of run.sim.monsters.values()) {
        if (m.dead || m.kind === 'pet') continue;
        const d = (m.pos.x - p.pos.x) ** 2 + (m.pos.y - p.pos.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = m.pos;
        }
      }
      if (run.vessel === 'spawned') {
        const v = run.sim.monsters.get(run.vesselId);
        if (v && !v.dead) best = v.pos;
      }
      if (best) field.build([best], 96);
    }
    let nearest: { id: number; x: number; y: number } | null = null;
    let nearestD = 1e9;
    let crowded = 0;
    for (const m of run.sim.monsters.values()) {
      if (m.dead || m.kind === 'pet') continue;
      const d = Math.hypot(m.pos.x - p.pos.x, m.pos.y - p.pos.y);
      if (d < 3.4) crowded++;
      if (d < nearestD) {
        nearestD = d;
        nearest = m;
      }
    }
    let dir = field.descend(p.pos.x, p.pos.y);
    let lock = 0;
    if (nearest && nearestD <= 2.25 && crowded < 3 && p.hp > p.maxHp * 0.36) {
      dir = { x: 0, y: 0 };
      lock = nearest.id;
    } else if (nearest && (crowded >= 3 || p.hp <= p.maxHp * 0.36)) {
      const dx = p.pos.x - nearest.x;
      const dy = p.pos.y - nearest.y;
      const l = Math.hypot(dx, dy) || 1;
      dir = { x: dx / l, y: dy / l };
    }
    if (!dir || stuck > 35) {
      bias += 0.8;
      dir = { x: Math.cos(bias), y: Math.sin(bias) };
    }
    if (Math.hypot(p.pos.x - lastX, p.pos.y - lastY) < 0.03) stuck++;
    else stuck = 0;
    lastX = p.pos.x;
    lastY = p.pos.y;
    let b = BTN.main;
    if (p.hp < p.maxHp * 0.72) b |= BTN.draught;
    if (t % 28 === 0) b |= BTN.a0;
    if (t % 36 === 8) b |= BTN.a1;
    if (p.resource > 45 && t % 40 === 4) b |= BTN.a2;
    run.step({ mx: dir.x, my: dir.y, b, lock });
  }
  const shards = save.shards;
  return {
    seconds: Math.round(run.sim.time),
    outcome: run.outcome ?? 'unfinished',
    shards,
    dust: save.dust,
    echo: `${Math.round(run.echo)}/${run.echoRequired}`,
  };
}

const seeds = [7, 19, 28];
console.log('Surface Echo Shafts');
for (const spec of LOADOUTS) {
  const rows = seeds.map((seed) => play(makeSave(spec.level, spec.relics), seed));
  const cleared = rows.filter((r) => r.outcome === 'clear');
  const avg = cleared.length ? Math.round(cleared.reduce((s, r) => s + r.seconds, 0) / cleared.length) : 0;
  const shards = cleared.length ? Math.round(cleared.reduce((s, r) => s + r.shards, 0) / cleared.length) : 0;
  console.log(`\n${spec.name}  L${spec.level}`);
  for (const row of rows) console.log(`  ${row.outcome.padEnd(10)} ${row.seconds}s  shards ${row.shards}  dust ${row.dust}  echo ${row.echo}`);
  console.log(`  clear avg ${avg}s, shards ${shards}`);
}
