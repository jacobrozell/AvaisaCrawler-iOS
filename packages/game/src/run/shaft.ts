// One shaft, in process. The phone and the Cloud Function both construct this.

import { CONTENT_VERSION, DEEP_VEIN_SECONDS, ECHO_FILL, PICKUP_RANGE } from '../constants.js';
import { PRESSURE_TIERS, deepVeinScaling, shaftSize, type ShaftKind } from '../content/shafts.js';
import { VESSEL_IDS } from '../content/monsters.js';
import { generateDungeon } from '../map/dungeon.js';
import { dist } from '../math.js';
import { killXp, applyXp } from '../rules/progression.js';
import { rollDrops, salvageDust } from '../rules/loot.js';
import { deriveStats } from '../rules/stats.js';
import type { Save } from '../save.js';
import type { Item } from '../rules/character.js';
import type { InputSample, Replay, WardenSnapshot } from '../wire.js';
import { LootItem, Player } from '../sim/entities.js';
import { Simulation } from '../sim/Simulation.js';
import { populateDungeon } from './spawner.js';

export type RunOutcome = 'clear' | 'death' | 'timeout' | 'abandoned';

export interface ShaftOptions {
  kind: ShaftKind;
  seed: number;
  pressure: number;
  depth: number;
  ranked: boolean;
  mutator: boolean;
  seasonId: string;
}

function q(n: number): number {
  return Math.round(n * 100) / 100;
}

function snapshotOf(save: Save): WardenSnapshot {
  return {
    boardName: save.boardName,
    level: save.level,
    xp: save.xp,
    shards: save.shards,
    dust: save.dust,
    equipped: structuredClone(save.equipped),
    trophy: structuredClone(save.trophy),
    stats: { ...save.stats },
  };
}

function applySnapshot(save: Save, snap: WardenSnapshot): void {
  save.boardName = snap.boardName;
  save.level = snap.level;
  save.xp = snap.xp;
  save.shards = snap.shards;
  save.dust = snap.dust;
  save.equipped = structuredClone(snap.equipped);
  save.trophy = structuredClone(snap.trophy);
  save.stats = { ...snap.stats };
}

export class ShaftRun {
  readonly sim: Simulation;
  readonly player: Player;
  readonly snap: WardenSnapshot;
  echo = 0;
  echoRequired = 0;
  vessel: 'none' | 'spawned' | 'slain' = 'none';
  vesselId = 0;
  found: Item[] = [];
  inputs: InputSample[] = [];
  outcome: RunOutcome | null = null;
  clearTick = 0;
  private readonly lootRng;
  private readonly vesselRng;
  private readonly rewardBonus: number;
  private readonly reliquaryMult: number;

  constructor(
    readonly save: Save,
    readonly opts: ShaftOptions,
  ) {
    const size = shaftSize(opts.kind);
    const layout = generateDungeon({ seed: opts.seed, ...size });
    const tier = PRESSURE_TIERS[opts.pressure] ?? PRESSURE_TIERS[0]!;
    // Surface life is tuned for a geared clear. The lesson mine is a separate, smaller shaft
    // where a company swing drops a thrall in one or two hits.
    const scaling = opts.kind === 'deep'
      ? deepVeinScaling(Math.max(1, opts.depth))
      : opts.kind === 'tutorial'
        ? { lifeMult: 0.85, damageMult: 0.4, rewardBonus: 0, reliquaryMult: 1 }
        : tier;
    this.rewardBonus = scaling.rewardBonus;
    this.reliquaryMult = scaling.reliquaryMult;
    this.sim = new Simulation(layout.map, opts.seed ^ 0x5eed, layout.start, {
      monsterLevel: save.level,
      lifeMult: scaling.lifeMult,
      damageMult: scaling.damageMult,
    });
    this.lootRng = this.sim.rng.fork('loot');
    this.vesselRng = this.sim.rng.fork('vessel');
    const summary = populateDungeon(this.sim, layout, this.sim.rng.fork('packs'), opts.kind === 'deep' ? 1.05 : 1, opts.kind === 'tutorial');
    const fill = opts.kind === 'tutorial' ? ECHO_FILL.tutorial : opts.kind === 'deep' ? ECHO_FILL.deep : ECHO_FILL.echo;
    this.echoRequired = Math.max(8, Math.round(summary.echoTotal * fill));
    this.snap = snapshotOf(save);
    const stats = deriveStats(save.level, save.equipped, save.trophy);
    this.player = new Player(this.sim.allocId(), { ...layout.start }, 'warden', save, stats, null);
    this.sim.addPlayer(this.player);
    this.sim.hooks.onMonsterKilled = (m) => this.onKill(m);
    this.sim.hooks.onPlayerDied = () => this.finish('death');
  }

  step(raw: { mx: number; my: number; b: number; lock: number }): void {
    if (this.outcome) return;
    const sample: InputSample = { t: this.sim.tick, mx: q(raw.mx), my: q(raw.my), b: raw.b | 0, lock: raw.lock | 0 };
    const last = this.inputs[this.inputs.length - 1];
    if (!last || last.mx !== sample.mx || last.my !== sample.my || last.b !== sample.b || last.lock !== sample.lock) this.inputs.push(sample);
    this.apply(sample);
    this.sim.step();
    this.settle();
  }

  /** Replay path: hold the last logged sample. Does not extend the log. */
  play(sample: InputSample): void {
    if (this.outcome) return;
    this.apply(sample);
    this.sim.step();
    this.settle();
  }

  abandon(): void {
    if (this.outcome) return;
    this.outcome = 'abandoned';
    this.inputs = [];
    this.found = [];
    applySnapshot(this.save, this.snap);
    const stats = deriveStats(this.save.level, this.save.equipped, this.save.trophy);
    this.player.stats = stats;
    this.player.maxHp = stats.maxLife;
    this.player.hp = stats.maxLife;
  }

  toReplay(): Replay | null {
    if (!this.opts.ranked || this.outcome !== 'clear') return null;
    return {
      seed: this.opts.seed,
      contentVersion: CONTENT_VERSION,
      seasonId: this.opts.seasonId,
      depth: this.opts.depth,
      ticks: this.clearTick,
      pressure: this.opts.pressure,
      mutator: this.opts.mutator,
      inputs: this.inputs.map((s) => ({ ...s })),
      warden: structuredClone(this.snap),
    };
  }

  fingerprint(): string {
    const p = this.player;
    const alive = [...this.sim.monsters.values()].filter((m) => !m.dead).sort((a, b) => a.id - b.id);
    const ms = alive.map((m) => `${m.id}:${Math.round(m.hp)}:${m.pos.x.toFixed(1)}:${m.pos.y.toFixed(1)}`).join(',');
    return `${this.sim.tick}|${p.pos.x.toFixed(2)}|${p.pos.y.toFixed(2)}|${Math.round(p.hp)}|${this.echo}|${this.vessel}|${ms}`;
  }

  private apply(sample: InputSample): void {
    this.player.input = {
      seq: this.sim.tick,
      mx: sample.mx,
      my: sample.my,
      ax: 0,
      ay: 0,
      buttons: sample.b,
      lock: sample.lock,
    };
  }

  private settle(): void {
    this.vacuum();
    if (this.outcome) return;
    if (this.opts.kind === 'deep' && this.vessel !== 'slain' && this.sim.time >= DEEP_VEIN_SECONDS) this.finish('timeout');
  }

  private vacuum(): void {
    const p = this.player;
    for (const l of [...this.sim.loot.values()]) {
      if (!(l instanceof LootItem) || l.ownerId !== p.id) continue;
      if (dist(l.pos, p.pos) > PICKUP_RANGE) continue;
      if (l.item.rarity === 'scrap') this.save.dust += salvageDust(l.item);
      else {
        this.found.push(l.item);
        if (l.item.rarity === 'reliquary') this.save.stats.reliquaries++;
      }
      this.sim.remove(l.id);
    }
  }

  private onKill(m: import('../sim/entities.js').Monster): void {
    if (m.noReward || m.kind === 'pet') return;
    const xp = applyXp(this.save.level, this.save.xp, killXp(m.def.xp, m.level, this.rewardBonus));
    this.save.level = xp.level;
    this.save.xp = xp.xp;
    if (xp.levelsGained) {
      const stats = deriveStats(this.save.level, this.save.equipped, this.save.trophy);
      const gained = stats.maxLife - this.player.maxHp;
      this.player.stats = stats;
      this.player.maxHp = stats.maxLife;
      this.player.hp = Math.min(stats.maxLife, this.player.hp + Math.max(0, gained));
      this.sim.emit({ t: 'lvl', id: this.player.id });
    }
    this.save.stats.kills++;
    this.dropFor(m);

    if (m.id === this.vesselId) {
      this.vessel = 'slain';
      this.save.stats.vessels++;
      this.finish('clear');
      return;
    }
    if (this.vessel !== 'none') return;
    const mult = m.tier === 'champion' ? 4 : m.tier === 'rare' ? 6 : m.tier === 'minion' ? 2 : 1;
    this.echo += m.def.echo * mult;
    if (this.echo >= this.echoRequired) this.spawnVessel(m.pos);
  }

  private dropFor(m: import('../sim/entities.js').Monster): void {
    const drop = rollDrops(this.lootRng, {
      tier: m.tier === 'minion' ? 'normal' : m.tier === 'boss' ? 'boss' : m.tier,
      dropMult: m.def.dropMult,
      shardMult: m.def.shardMult,
      monsterLevel: m.level,
      rewardBonus: this.rewardBonus,
      reliquaryMult: this.reliquaryMult,
      shardFind: this.player.stats.shardFind,
      mutator: this.opts.mutator,
    });
    for (const item of drop.items) {
      if (item.rarity === 'scrap') {
        this.save.dust += salvageDust(item);
        continue;
      }
      this.sim.dropItem(m.pos, this.player.id, item);
    }
    for (const amount of drop.shardPiles) this.sim.dropShards(m.pos, this.player.id, amount);
    if (drop.globe) this.sim.dropGlobe(m.pos);
  }

  private spawnVessel(near: { x: number; y: number }): void {
    const defId = this.vesselRng.pick(VESSEL_IDS);
    let pos = { ...near };
    for (let i = 0; i < 24; i++) {
      const a = this.vesselRng.next() * Math.PI * 2;
      const p = { x: near.x + Math.cos(a) * 5, y: near.y + Math.sin(a) * 5 };
      if (!this.sim.map.collides(p.x, p.y, 1.1) && this.sim.map.lineOfSight(near, p)) {
        pos = p;
        break;
      }
    }
    const v = this.sim.spawnMonster(defId, pos, { tier: 'boss' });
    v.dormant = false;
    if (this.opts.kind === 'tutorial') {
      v.maxHp = 48;
      v.hp = 48;
    }
    this.vesselId = v.id;
    this.vessel = 'spawned';
    this.sim.emit({ t: 'fx', v: 'vessel_rise', x: pos.x, y: pos.y, r: 3 });
  }

  private finish(outcome: RunOutcome): void {
    if (this.outcome === 'abandoned') return;
    if (outcome === 'death') {
      this.outcome = 'death';
      return;
    }
    if (this.outcome) return;
    this.outcome = outcome;
    if (outcome === 'clear') this.clearTick = this.sim.tick;
  }
}

export function playback(save: Save, opts: ShaftOptions, inputs: readonly InputSample[], ticks: number): ShaftRun {
  const run = new ShaftRun(save, opts);
  let i = 0;
  let held: InputSample = inputs[0] ?? { t: 0, mx: 0, my: 0, b: 0, lock: 0 };
  while (run.sim.tick < ticks && !run.outcome) {
    while (i + 1 < inputs.length && inputs[i + 1]!.t <= run.sim.tick) held = inputs[++i]!;
    run.play(held);
  }
  return run;
}
