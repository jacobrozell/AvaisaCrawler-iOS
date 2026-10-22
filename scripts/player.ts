// In-process player for the Echo Shafts MCP. Same sim the phone runs.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BTN,
  DEEP_VEIN_UNLOCK_LEVEL,
  HUB_REACH,
  Hub,
  STATIONS,
  ShaftRun,
  TICK_RATE,
  activeWindow,
  buildResults,
  claimNight,
  equipItem,
  ensureLessonSeal,
  keepItem,
  loadSave,
  newSave,
  salvageInto,
  sellItems,
  STASH_CAP,
  sellValue,
  storeItem,
  withdrawItem,
  type Save,
  type Station,
} from '@echo/game';
import { DistanceField } from '../packages/game/src/map/tilemap.ts';

const SAVE_PATH = resolve(dirname(fileURLToPath(import.meta.url)), '../data/playtest-save.json');

let save: Save = read();
let hub: Hub | null = null;
let run: ShaftRun | null = null;
let lastRun: Record<string, unknown> | null = null;

function read(): Save {
  try {
    return loadSave(JSON.parse(readFileSync(SAVE_PATH, 'utf8')));
  } catch {
    return newSave();
  }
}

function persist(): void {
  mkdirSync(dirname(SAVE_PATH), { recursive: true });
  writeFileSync(SAVE_PATH, JSON.stringify(save));
}

function camp(): Hub {
  if (!hub) hub = new Hub(save);
  return hub;
}

function text(value: unknown, isError = false) {
  const body = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return { content: [{ type: 'text' as const, text: body }], ...(isError ? { isError: true } : {}) };
}

export async function callTool(name: string, args: Record<string, unknown>) {
  try {
    if (name === 'look') return text(look());
    if (name === 'walk') return text(walk(String(args.to ?? '')));
    if (name === 'act') return text(act(args));
    if (name === 'fight') return text(fight(Number(args.seconds ?? 20)));
    if (name === 'play') return text(play(Number(args.seconds ?? 70)));
    if (name === 'reset') return text(reset(args.fresh !== false));
    return text(`Unknown tool ${name}`, true);
  } catch (err) {
    return text(err instanceof Error ? err.message : String(err), true);
  }
}

function look() {
  const near = run ? null : camp().nearest();
  const pos = run ? run.player.pos : camp().player.pos;
  const map = run ? run.sim.map : camp().sim.map;
  return {
    where: run ? (run.outcome ? 'results' : 'shaft') : 'camp',
    pos: { x: round(pos.x), y: round(pos.y) },
    hp: run ? `${Math.round(run.player.hp)}/${Math.round(run.player.maxHp)}` : 'camp',
    echo: run ? `${Math.round(run.echo)}/${run.echoRequired}` : null,
    vessel: run?.vessel ?? null,
    outcome: run?.outcome ?? null,
    seconds: run ? Math.round(run.sim.time) : null,
    nearest: near ? { id: near.id, name: near.name, label: prompt(near) } : null,
    stations: run ? [] : STATIONS.map((s) => ({ id: s.id, name: s.name, d: round(Math.hypot(s.x - pos.x, s.y - pos.y)) })),
    level: save.level,
    tutorial: save.tutorial,
    shards: save.shards,
    dust: save.dust,
    pack: save.inventory.map((item) => ({ id: item.id, name: item.name, rarity: item.rarity, sell: sellValue(item) })),
    stash: save.stash.map((item) => ({ id: item.id, name: item.name, rarity: item.rarity, sell: sellValue(item) })),
    pending: (save.pendingBag ?? []).map((item) => item.name),
    lastRun,
    map: ascii(map, pos.x, pos.y, !run),
  };
}

function prompt(station: Station): string {
  if (station.id === 'night') return save.unclaimedNight ? 'Claim night shift' : '';
  if (station.id === 'shaft' && save.pendingBag?.length) return 'Results';
  return station.label;
}

function walk(to: string) {
  if (run && !run.outcome) return { error: 'In a shaft. fight, or wait for the result.' };
  if (run?.outcome) settle();
  const station = STATIONS.find((s) => s.id === to || s.name.toLowerCase() === to.toLowerCase());
  if (!station) return { error: `No stall "${to}". Use shaft, sell, reforge, stash, rank, loadout, or night.` };
  const yard = camp();
  const map = yard.sim.map;
  for (let i = 0; i < 20 * 15 && yard.nearest()?.id !== station.id; i++) {
    const goal = map.nearestOpen(station.x, station.y, 0.42);
    const step = stepToward(map, yard.player.pos, goal);
    yard.step(step.x, step.y);
  }
  persist();
  const arrived = yard.nearest()?.id === station.id;
  return { arrived, reach: HUB_REACH, ...look() };
}

function stepToward(map: Hub['sim']['map'], from: { x: number; y: number }, goal: { x: number; y: number }): { x: number; y: number } {
  const start = `${Math.floor(from.x)},${Math.floor(from.y)}`;
  const end = `${Math.floor(goal.x)},${Math.floor(goal.y)}`;
  const prev = new Map<string, string | null>();
  const q = [start];
  prev.set(start, null);
  while (q.length) {
    const cur = q.shift()!;
    if (cur === end) break;
    const [x, y] = cur.split(',').map(Number) as [number, number];
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nx = x + dx;
      const ny = y + dy;
      const key = `${nx},${ny}`;
      if (prev.has(key) || map.solidAt(nx, ny)) continue;
      prev.set(key, cur);
      q.push(key);
    }
  }
  let cursor = prev.has(end) ? end : start;
  const chain = [cursor];
  while (prev.get(cursor)) {
    cursor = prev.get(cursor)!;
    chain.push(cursor);
  }
  chain.reverse();
  const next = chain[Math.min(3, chain.length - 1)] ?? start;
  const [tx, ty] = next.split(',').map(Number) as [number, number];
  const dx = tx + 0.5 - from.x;
  const dy = ty + 0.5 - from.y;
  const l = Math.hypot(dx, dy) || 1;
  return { x: dx / l, y: dy / l };
}

function act(args: Record<string, unknown>) {
  const t = String(args.t ?? '');
  if (run && !run.outcome && t !== 'fight') return { error: 'Still in the shaft.' };
  if (run?.outcome) settle();
  if (t === 'descend' || t === 'vein') return descend(t === 'vein', Number(args.depth ?? (save.rankedBest?.depth ?? 0) + 1));
  if (t === 'sell') return sell(asIds(args.ids));
  if (t === 'stash') return moveStash(asIds(args.ids), true);
  if (t === 'withdraw') return moveStash(asIds(args.ids), false);
  if (t === 'results') return sheet();
  if (t === 'equip' || t === 'pack' || t === 'keep' || t === 'salvage' || t === 'resolve') return sheetAct(t, String(args.id ?? ''));
  const yard = camp();
  if (t === 'claim') {
    if (yard.nearest()?.id !== 'night') return { error: 'Walk to the cot first.' };
    const pay = claimNight(save, Date.now());
    persist();
    return { pay, ...look() };
  }
  return { error: `Unknown act ${t}` };
}

function descend(ranked: boolean, depth: number) {
  if (camp().nearest()?.id !== 'shaft') return { error: 'Walk to the shaft first.' };
  if (save.pendingBag?.length) return { error: 'Results are waiting.', ...look() };
  if (ranked && save.level < DEEP_VEIN_UNLOCK_LEVEL) return { error: `Deep Vein unlocks at ${DEEP_VEIN_UNLOCK_LEVEL}.` };
  lastRun = null;
  const tutorial = !ranked && save.tutorial < 3;
  if (tutorial && save.tutorial === 1) ensureLessonSeal(save);
  const season = activeWindow(save, Date.now());
  run = new ShaftRun(save, {
    kind: ranked ? 'deep' : tutorial ? 'tutorial' : 'echo',
    seed: (Math.random() * 0x7fffffff) | 0 || 1,
    pressure: save.pressure,
    depth: ranked ? depth : 0,
    ranked,
    mutator: season.mutator,
    seasonId: season.id,
  });
  return look();
}

function fight(seconds: number) {
  if (!run) return { error: 'Not in a shaft. Walk to the shaft and descend.' };
  if (run.outcome) return look();
  const ticks = Math.max(1, Math.min(180, seconds) * TICK_RATE);
  const field = new DistanceField(run.sim.map);
  let stuck = 0;
  let bias = 0;
  let lastX = run.player.pos.x;
  let lastY = run.player.pos.y;
  for (let t = 0; t < ticks && !run.outcome; t++) {
    const p = run.player;
    if (t % 10 === 0) {
      let best: { x: number; y: number } | null = null;
      let bestD = 1e12;
      for (const m of run.sim.monsters.values()) {
        if (m.dead || m.faction === 'players') continue;
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
      if (m.dead || m.faction === 'players') continue;
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
    run.sim.events.length = 0;
  }
  if (run.outcome) settle();
  return { lastRun, ...look() };
}

function play(seconds: number) {
  const walked = walk('shaft');
  if (!walked.arrived) return walked;
  const started = descend(false, 0);
  if ('error' in started) return started;
  return fight(seconds);
}

function settle() {
  if (!run?.outcome || run.outcome === 'abandoned') {
    run = null;
    return;
  }
  lastRun = {
    outcome: run.outcome,
    seconds: Math.round(run.sim.time),
    echo: `${Math.round(run.echo)}/${run.echoRequired}`,
    hp: `${Math.round(run.player.hp)}/${Math.round(run.player.maxHp)}`,
    kills: save.stats.kills,
    found: run.found.map((item) => item.name),
    shards: save.shards,
    kind: run.opts.kind,
  };
  if (!run.opts.ranked && save.tutorial < 3) save.tutorial = (save.tutorial + 1) as Save['tutorial'];
  save.pendingBag = run.found.length ? run.found.slice() : null;
  run = null;
  persist();
}

function sheet() {
  const bag = save.pendingBag ?? [];
  const built = buildResults(save.level, save.equipped, bag, save.trophy);
  return {
    pending: bag.map((item) => ({ id: item.id, name: item.name, rarity: item.rarity })),
    upgrades: built.upgrades.map((card) => ({ id: card.item.id, name: card.item.name, dps: card.dps, toughness: card.toughness })),
    junk: built.junk.map((item) => item.id),
  };
}

function sheetAct(t: string, id: string) {
  const bag = () => save.pendingBag ?? [];
  const take = (itemId: string) => {
    const item = bag().find((entry) => entry.id === itemId);
    if (!item) return null;
    const next = bag().filter((entry) => entry.id !== itemId);
    save.pendingBag = next.length ? next : null;
    return item;
  };
  if (t === 'resolve') {
    const built = buildResults(save.level, save.equipped, bag(), save.trophy);
    const equipped: string[] = [];
    for (const card of built.upgrades) {
      const item = take(card.item.id);
      if (!item) continue;
      const prev = equipItem(save, item);
      if (prev) save.pendingBag = [...(save.pendingBag ?? []), prev];
      equipped.push(item.name);
    }
    let dust = 0;
    for (const item of [...(save.pendingBag ?? [])]) {
      salvageInto(save, item);
      dust += 1;
      save.pendingBag = (save.pendingBag ?? []).filter((entry) => entry.id !== item.id);
    }
    save.pendingBag = save.pendingBag?.length ? save.pendingBag : null;
    persist();
    return { equipped, salvaged: dust, ...look() };
  }
  const item = take(id);
  if (!item) return { error: 'That drop is not on the sheet.', ...sheet() };
  if (t === 'equip') {
    const prev = equipItem(save, item);
    if (prev) save.pendingBag = [...(save.pendingBag ?? []), prev];
  } else if (t === 'pack') {
    if (!keepItem(save, item)) {
      save.pendingBag = [...(save.pendingBag ?? []), item];
      return { error: 'The pack holds 20.' };
    }
  } else if (t === 'keep') {
    if (save.stash.length >= STASH_CAP) {
      save.pendingBag = [...(save.pendingBag ?? []), item];
      return { error: 'The chest is full.' };
    }
    save.stash.push(item);
  } else {
    salvageInto(save, item);
  }
  persist();
  return { took: item.name, ...sheet(), ...look() };
}

function sell(ids: string[]) {
  if (camp().nearest()?.id !== 'sell') return { error: 'Walk to the buyer first.' };
  const gained = sellItems(save, ids.length ? ids : save.inventory.filter((item) => item.rarity === 'scrap').map((item) => item.id));
  persist();
  return { gained, ...look() };
}

function moveStash(ids: string[], into: boolean) {
  if (camp().nearest()?.id !== 'stash') return { error: 'Walk to the chest first.' };
  const moved: string[] = [];
  for (const id of ids) {
    if (into ? storeItem(save, id) : withdrawItem(save, id)) moved.push(id);
  }
  if (!ids.length && into) {
    for (const item of [...save.inventory]) if (storeItem(save, item.id)) moved.push(item.id);
  }
  persist();
  return { moved, ...look() };
}

function reset(fresh: boolean) {
  if (fresh) save = newSave();
  else save = read();
  hub = new Hub(save);
  run = null;
  persist();
  return look();
}

function asIds(raw: unknown): string[] {
  return Array.isArray(raw) ? raw.map(String) : [];
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

function ascii(map: { solidAt(x: number, y: number): boolean; w: number; h: number }, px: number, py: number, marks: boolean): string {
  const lines: string[] = [];
  for (let y = Math.floor(py) - 6; y <= Math.floor(py) + 6; y++) {
    let row = '';
    for (let x = Math.floor(px) - 10; x <= Math.floor(px) + 10; x++) {
      const station = marks ? STATIONS.find((s) => Math.floor(s.x) === x && Math.floor(s.y) === y) : undefined;
      if (x === Math.floor(px) && y === Math.floor(py)) row += '@';
      else if (station) row += station.id[0]!.toUpperCase();
      else if (x < 0 || y < 0 || x >= map.w || y >= map.h || map.solidAt(x, y)) row += '#';
      else row += '.';
    }
    lines.push(row);
  }
  return lines.join('\n');
}
