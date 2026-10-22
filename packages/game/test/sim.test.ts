import { describe, expect, it } from 'vitest';
import {
  BTN,
  CHARACTER_VERSION,
  CONTENT_VERSION,
  LEGENDARIES,
  MUTATOR,
  NIGHT_CAP_MS,
  PACK_CAP,
  RETIRE_WARN_MS,
  SEASON_LENGTH_MS,
  SURFACE_CLEAR_DUST,
  SURFACE_CLEAR_SHARDS,
  WEEK_MS,
  Hub,
  STATIONS,
  ShaftRun,
  Tile,
  TileMap,
  buildHub,
  deriveStats,
  judgeReplay,
  keepItem,
  loadSave,
  newSave,
  nightShiftPay,
  playback,
  relicPool,
  reforgeAffix,
  resolveWindow,
  rollItem,
  seasonPhase,
  sellItems,
  storeItem,
  withdrawItem,
  type Save,
  type WardenSnapshot,
} from '@echo/game';
import { Rng } from '../src/math.js';
import { Player } from '../src/sim/entities.js';
import { Simulation } from '../src/sim/Simulation.js';

function arena(): TileMap {
  const m = new TileMap(40, 30);
  for (let y = 1; y < 29; y++) for (let x = 1; x < 39; x++) m.set(x, y, Tile.Floor);
  return m;
}

function warden(sim: Simulation, save = newSave(1)): Player {
  const stats = deriveStats(save.level, save.equipped, save.trophy);
  const p = new Player(sim.allocId(), { x: 10, y: 15 }, 'warden', save, stats, null);
  sim.addPlayer(p);
  return p;
}

function shaftSave(): Save {
  return newSave(1_700_000_000_000);
}

describe('Main and artifacts', () => {
  it('spends the artifact cost and hits', () => {
    const sim = new Simulation(arena(), 1, { x: 10, y: 15 }, { monsterLevel: 1, lifeMult: 1, damageMult: 1 });
    const save = newSave(1);
    save.equipped.artifact0 = rollItem(new Rng(4), { ilvl: 5, rarity: 'reliquary', legendaryId: 'ruin_rite' });
    const p = warden(sim, save);
    p.stats = deriveStats(save.level, save.equipped, save.trophy);
    p.resource = 80;
    const m = sim.spawnMonster('initiate', { x: 12, y: 15 });
    p.input = { seq: 1, mx: 1, my: 0, ax: 0, ay: 0, buttons: BTN.a0, lock: 0 };
    sim.step();
    expect(p.resource).toBeLessThan(80);
    expect(m.hp).toBeLessThan(m.maxHp);
  });

  it('an empty artifact button does nothing', () => {
    const sim = new Simulation(arena(), 1, { x: 10, y: 15 }, { monsterLevel: 1, lifeMult: 1, damageMult: 1 });
    const p = warden(sim);
    p.resource = 40;
    p.lastCombat = 0;
    p.input = { seq: 1, mx: 0, my: 0, ax: 0, ay: 0, buttons: BTN.a0, lock: 0 };
    sim.step();
    expect(p.resource).toBe(40);
    expect(sim.events.some((e) => e.t === 'cast')).toBe(false);
  });

  it('the Main whiffs when the arc is empty', () => {
    const sim = new Simulation(arena(), 2, { x: 10, y: 15 }, { monsterLevel: 1, lifeMult: 1, damageMult: 1 });
    const p = warden(sim);
    const m = sim.spawnMonster('initiate', { x: 10, y: 22 });
    p.input = { seq: 1, mx: 1, my: 0, ax: 0, ay: 0, buttons: BTN.main, lock: 0 };
    sim.step();
    expect(m.hp).toBe(m.maxHp);
    expect(p.resource).toBe(0);
    expect(sim.events.some((e) => e.t === 'fx' && e.v === 'whiff')).toBe(true);
  });

  it('a soft-lock swings at that enemy until the stick turns away', () => {
    const sim = new Simulation(arena(), 3, { x: 10, y: 15 }, { monsterLevel: 1, lifeMult: 1, damageMult: 1 });
    const p = warden(sim);
    const m = sim.spawnMonster('initiate', { x: 11.6, y: 15 });
    p.input = { seq: 1, mx: 0, my: 0, ax: 0, ay: 0, buttons: BTN.main, lock: m.id };
    sim.step();
    expect(m.hp).toBeLessThan(m.maxHp);
    expect(p.lockId).toBe(m.id);

    const side = sim.spawnMonster('initiate', { x: 10, y: 17.2 });
    p.input = { seq: 2, mx: 1, my: 0, ax: 0, ay: 0, buttons: BTN.main, lock: side.id };
    const before = side.hp;
    sim.step();
    expect(p.lockId).toBe(0);
    expect(side.hp).toBe(before);
  });
});

describe('death and replay', () => {
  it('death ends the run, keeps what was collected, and stores no replay', () => {
    const save = shaftSave();
    const run = new ShaftRun(save, {
      kind: 'deep', seed: 11, pressure: 0, depth: 1, ranked: true, mutator: false, seasonId: 'season-1',
    });
    const kept = rollItem(new Rng(9), { ilvl: 3, rarity: 'graded', slot: 'plate' });
    run.found.push(kept);
    run.sim.killPlayer(run.player);
    expect(run.outcome).toBe('death');
    expect(run.found.map((i) => i.id)).toContain(kept.id);
    expect(run.toReplay()).toBeNull();
  });

  it('the same seed and input log reproduce the shaft', () => {
    const save = shaftSave();
    const opts = { kind: 'echo' as const, seed: 42, pressure: 0, depth: 0, ranked: false, mutator: false, seasonId: 'season-1' };
    const run = new ShaftRun(save, opts);
    for (let i = 0; i < 60; i++) run.step({ mx: i < 30 ? 1 : 0, my: i < 30 ? 0 : 1, b: i % 8 < 5 ? BTN.main : 0, lock: 0 });
    const ghost = newSave(0);
    const snap: WardenSnapshot = run.snap;
    ghost.level = snap.level;
    ghost.xp = snap.xp;
    ghost.shards = snap.shards;
    ghost.dust = snap.dust;
    ghost.equipped = structuredClone(snap.equipped);
    ghost.trophy = structuredClone(snap.trophy);
    ghost.stats = { ...snap.stats };
    const again = playback(ghost, opts, run.inputs, run.sim.tick);
    expect(again.fingerprint()).toBe(run.fingerprint());
  });

  it('rejects a content version the binary does not run', () => {
    const save = shaftSave();
    const run = new ShaftRun(save, { kind: 'deep', seed: 3, pressure: 0, depth: 1, ranked: true, mutator: false, seasonId: 'season-1' });
    run.step({ mx: 0, my: 0, b: 0, lock: 0 });
    const replay = {
      seed: 3,
      contentVersion: CONTENT_VERSION + 9,
      seasonId: 'season-1',
      depth: 1,
      ticks: 1,
      pressure: 0,
      mutator: false,
      inputs: run.inputs,
      warden: run.snap,
    };
    const verdict = judgeReplay(replay, { contentVersion: CONTENT_VERSION, seasonId: 'season-1', endsAt: 9e15, now: 0 });
    expect(verdict).toEqual({ ok: false, reason: 'version' });
  });
});

describe('night shift and season', () => {
  it('caps the night shift under one Surface clear and never above Graded', () => {
    const cap = nightShiftPay(NIGHT_CAP_MS, new Rng(1), 8);
    const over = nightShiftPay(NIGHT_CAP_MS * 5, new Rng(1), 8);
    expect(over.shards).toBe(cap.shards);
    expect(over.dust).toBe(cap.dust);
    expect(over.capped).toBe(true);
    expect(cap.shards).toBeGreaterThan(0);
    expect(cap.shards).toBeLessThan(SURFACE_CLEAR_SHARDS);
    expect(cap.dust).toBeLessThan(SURFACE_CLEAR_DUST);
    expect(cap.items.every((i) => i.rarity === 'graded')).toBe(true);
    expect(cap).not.toHaveProperty('depth');
    expect(nightShiftPay(0, new Rng(1), 8).shards).toBe(0);
  });

  it('uses an 8 week window, a 10–14 day mutator, a 7 day warning, and the last fetch offline', () => {
    const day = 24 * 60 * 60 * 1000;
    expect(SEASON_LENGTH_MS).toBe(8 * WEEK_MS);
    expect(MUTATOR.durationMs).toBeGreaterThanOrEqual(10 * day);
    expect(MUTATOR.durationMs).toBeLessThanOrEqual(14 * day);
    expect(MUTATOR.dropIds.length).toBeGreaterThanOrEqual(2);
    expect(MUTATOR.dropIds.length).toBeLessThanOrEqual(3);
    expect(RETIRE_WARN_MS).toBe(7 * day);
    const now = Date.UTC(2026, 10, 1);
    const fetched = { id: 'season-1', endsAt: now + 20 * day, mutator: false };
    expect(resolveWindow(fetched, now)).toEqual(fetched);
    expect(seasonPhase({ id: 'season-1', endsAt: now + 3 * day, mutator: true }, now)).toBe('retiring');
    expect(seasonPhase({ id: 'season-1', endsAt: now - 1, mutator: true }, now)).toBe('ended');
  });
});

describe('loadout rules', () => {
  it('wipes a version 1 POC save', () => {
    const save = loadSave({ version: 1, id: 'poc', name: 'Hessa' }, 50);
    expect(save.version).toBe(CHARACTER_VERSION);
    expect(save.equipped.weapon?.name).toBe('Company Pick-Hammer');
    expect(save.inventory).toEqual([]);
  });

  it('reforge replaces an enchantment and cannot add or change a unique', () => {
    const plain = rollItem(new Rng(6), { ilvl: 6, rarity: 'graded', slot: 'plate' });
    expect(plain.legendaryId).toBeUndefined();
    expect(plain.affixes.length).toBeGreaterThan(0);
    const next = reforgeAffix(new Rng(7), plain, 0);
    expect(next.legendaryId).toBeUndefined();
    expect(next.enchanted).toBe(0);
    const relic = rollItem(new Rng(8), { ilvl: 8, rarity: 'reliquary', legendaryId: 'thekias_ledger' });
    const again = reforgeAffix(new Rng(9), relic, 0);
    expect(again.legendaryId).toBe('thekias_ledger');
  });

  it('weights seasonal reliquaries, authors anchors, and caps the pack at 20', () => {
    const core = Object.values(LEGENDARIES).filter((l) => l.pool === 'core');
    const season = Object.values(LEGENDARIES).filter((l) => l.pool === 'season');
    const event = Object.values(LEGENDARIES).filter((l) => l.pool === 'event');
    expect(core).toHaveLength(6);
    expect(season.length).toBeGreaterThanOrEqual(12);
    expect(season.length).toBeLessThanOrEqual(16);
    expect(event.length).toBeGreaterThanOrEqual(2);
    expect(event.length).toBeLessThanOrEqual(3);
    expect(Math.min(...season.map((l) => l.weight))).toBeGreaterThan(Math.max(...core.map((l) => l.weight)));
    expect(relicPool(false).some((l) => l.pool === 'event')).toBe(false);
    expect(relicPool(true).filter((l) => l.pool === 'event')).toHaveLength(event.length);
    const swings = new Set(Object.values(LEGENDARIES).map((l) => l.swing?.kind).filter(Boolean));
    expect(swings).toEqual(new Set(['arc', 'projectile', 'summon']));
    for (const leg of Object.values(LEGENDARIES)) expect(['flesh', 'earth', 'sky']).toContain(leg.anchor);

    let flesh = 0;
    let stamped = 0;
    for (let i = 0; i < 180; i++) {
      const item = rollItem(new Rng(1000 + i), { ilvl: 10, rarity: 'stamped' });
      const anchor = item.affixes.find((a) => a.id === 'flesh' || a.id === 'earth' || a.id === 'sky');
      if (!anchor) continue;
      stamped++;
      if (anchor.id === 'flesh') flesh++;
    }
    expect(stamped).toBeGreaterThan(100);
    expect(flesh / stamped).toBeLessThan(0.55);

    const save = newSave(1);
    const filler = rollItem(new Rng(2), { ilvl: 2, rarity: 'graded', slot: 'charm' });
    for (let i = 0; i < PACK_CAP; i++) expect(keepItem(save, { ...filler, id: `k${i}` })).toBe(true);
    expect(keepItem(save, { ...filler, id: 'overflow' })).toBe(false);
    expect(save.inventory).toHaveLength(20);
    expect(keepItem(save, { ...filler, id: 'overflow' })).toBe(false);
    expect(storeItem(save, 'k0')).toBe(true);
    expect(save.stash).toHaveLength(1);
    expect(save.inventory).toHaveLength(19);
    expect(keepItem(save, { ...filler, id: 'overflow' })).toBe(true);
    expect(withdrawItem(save, 'k0')).toBe(false);
    storeItem(save, 'overflow');
    expect(withdrawItem(save, 'k0')).toBe(true);
    const before = save.shards;
    const sold = sellItems(save, ['k1']);
    expect(sold).toBeGreaterThan(0);
    expect(save.shards).toBe(before + sold);
    expect(save.inventory.some((item) => item.id === 'k1')).toBe(false);
    expect(sellItems(save, [save.equipped.weapon!.id])).toBe(0);
  });

  it('the camp yard is walkable to every stall', () => {
    const map = buildHub();
    const seen = new Set<string>();
    const queue: [number, number][] = [[20, 14]];
    while (queue.length) {
      const [x, y] = queue.pop()!;
      const key = `${x},${y}`;
      if (seen.has(key) || map.solidAt(x, y)) continue;
      seen.add(key);
      queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    for (const station of STATIONS) {
      expect(seen.has(`${Math.floor(station.x)},${Math.floor(station.y)}`), station.name).toBe(true);
    }
    const save = newSave(1);
    const hub = new Hub(save);
    for (let i = 0; i < 40; i++) hub.step(0, -1);
    expect(hub.player.pos.y).toBeLessThan(14);
    expect(map.collides(hub.player.pos.x, hub.player.pos.y, 0.42)).toBe(false);
  });

  it('the practice shaft falls to a company swing', () => {
    const save = newSave();
    const stats = deriveStats(save.level, save.equipped, save.trophy);
    const swing = ((stats.weaponMin + stats.weaponMax) / 2) * 1.2 * (1 + stats.anchor / 100);
    const run = new ShaftRun(save, {
      kind: 'tutorial', seed: 5, pressure: 0, depth: 0, ranked: false, mutator: false, seasonId: 'season-1',
    });
    const mobs = [...run.sim.monsters.values()];
    expect(mobs.length).toBeGreaterThan(0);
    for (const m of mobs) {
      expect(['thrall', 'mite']).toContain(m.def.id);
      expect(m.maxHp).toBeLessThanOrEqual(Math.ceil(swing * 2));
    }
  });
});
