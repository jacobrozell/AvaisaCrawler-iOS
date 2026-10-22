// Damage, healing, statuses and Reliquary procs. All combat math funnels through
// here so balance changes have one home.

import {
  ECHO_SURGE_DAMAGE,
  ECHO_SURGE_VULNERABILITY,
  armorReduction,
  itemHooks,
  type ProcEffect,
  type SkillSlot,
  type StatusDef,
} from '../bridge.js';
import { Monster, Player, type ActiveBuff, type Unit } from './entities.js';
import type { Simulation } from './Simulation.js';

const COMBAT_TIMEOUT = 4;

export function tickUnitTimers(sim: Simulation, u: Unit, dt: number): void {
  if (u.slowLeft > 0) u.slowLeft -= dt;
  if (u.stunLeft > 0) {
    u.stunLeft -= dt;
    u.changedTick = sim.tick;
  }
  if (u.vulnerableLeft > 0) u.vulnerableLeft -= dt;
  if (u.dots.length && !u.dead) {
    let total = 0;
    let src = 0;
    for (const d of u.dots) {
      const step = Math.min(dt, d.left);
      total += d.dps * step;
      d.left -= step;
      src = d.srcId;
    }
    u.dots = u.dots.filter((d) => d.left > 0);
    if (total > 0) {
      u.hp -= total;
      u.changedTick = sim.tick;
      if (u.hp <= 0) {
        if (u instanceof Monster) sim.killMonster(u, sim.players.get(src) ?? null);
        else if (u instanceof Player) sim.killPlayer(u);
      }
    }
  }
}

export function applyStatus(sim: Simulation, t: Unit, s: StatusDef, src: Player | null, weaponAvg = 0): void {
  if (t.dead) return;
  // Bosses shrug off most crowd control.
  const ccMult = t instanceof Monster && t.tier === 'boss' ? 0.25 : t instanceof Monster && t.tier !== 'normal' ? 0.6 : 1;
  switch (s.kind) {
    case 'slow':
      t.slowPct = Math.max(t.slowLeft > 0 ? t.slowPct : 0, s.pct * (ccMult < 1 ? 0.7 : 1));
      t.slowLeft = Math.max(t.slowLeft, s.duration);
      break;
    case 'stun':
      t.stunLeft = Math.max(t.stunLeft, s.duration * ccMult);
      if (t instanceof Monster && t.tier !== 'boss') t.windup = null;
      break;
    case 'vulnerable':
      t.vulnerablePct = s.pct;
      t.vulnerableLeft = s.duration;
      break;
    case 'bleed':
    case 'burn': {
      if (!src) return;
      const dps = weaponAvg * s.coefPerSec * damageMultiplier(src, t as Monster, null);
      // Refresh rather than stack the same DoT from the same source.
      const existing = t.dots.find((d) => d.kind === s.kind && d.srcId === src.id);
      if (existing) {
        existing.dps = Math.max(existing.dps, dps);
        existing.left = s.duration;
      } else t.dots.push({ dps, left: s.duration, srcId: src.id, kind: s.kind });
      break;
    }
  }
  t.changedTick = sim.tick;
}

/** Every multiplicative bonus a player brings to a hit, excluding the weapon roll and crits. */
export function damageMultiplier(p: Player, target: Monster | null, slot: SkillSlot | null): number {
  const st = p.stats;
  let m = (1 + st.anchor / 100) * (1 + st.damagePct) * (1 + p.buffSum('damagePct'));
  if (p.surging) m *= 1 + ECHO_SURGE_DAMAGE;
  if (target && target.tier !== 'normal') m *= 1 + st.eliteDamage;
  if (slot === 'a0' || slot === 'a1' || slot === 'a2') m *= 1 + st.secondaryDamage;
  if (target && target.vulnerableLeft > 0) m *= 1 + target.vulnerablePct;
  return m;
}

export interface HitOptions {
  slot?: SkillSlot;
  applies?: StatusDef;
  /** Proc-generated damage does not itself proc (prevents infinite chains). */
  noProcs?: boolean;
}

/** A player hits a monster for `coef` × weapon damage. Returns damage dealt. */
export function playerHitMonster(sim: Simulation, p: Player, t: Monster, coef: number, opts: HitOptions = {}): number {
  if (t.dead || t.kind === 'pet') return 0;
  const st = p.stats;
  const roll = st.weaponMin + sim.rng.next() * (st.weaponMax - st.weaponMin);
  const crit = sim.rng.chance(st.critChance);
  let dmg = coef > 0 ? roll * coef * damageMultiplier(p, t, opts.slot ?? null) : 0;
  if (crit) dmg *= 1 + st.critDamage;
  dmg *= t.damageTakenMult;
  dmg = Math.round(dmg);

  p.lastCombat = sim.time;
  t.hitBy.add(p.id);
  if (!t.aggro && t.def.ai !== 'flee') {
    t.aggro = true;
    t.aggroAt = sim.time;
    t.targetId = p.id;
  }
  if (t.def.ai === 'flee' && !t.aggro) {
    t.aggro = true;
    t.aggroAt = sim.time;
  }

  if (dmg > 0) {
    t.hp -= dmg;
    t.changedTick = sim.tick;
    sim.emit({ t: 'dmg', id: t.id, a: dmg, c: crit ? 1 : undefined, s: p.id, x: t.pos.x, y: t.pos.y });
    if (st.lifeOnHit > 0 && !opts.noProcs) healUnit(sim, p, st.lifeOnHit, false);
  }
  const weaponAvg = (st.weaponMin + st.weaponMax) / 2;
  if (opts.applies) applyStatus(sim, t, opts.applies, p, weaponAvg);
  if (!opts.noProcs) runHitProcs(sim, p, t, opts.slot === 'main');
  if (t.hp <= 0) sim.killMonster(t, p);
  return dmg;
}

/** Pet bites scale off the owner's weapon. */
export function petHitMonster(sim: Simulation, pet: Monster, t: Monster, coef: number): void {
  const owner = sim.players.get(pet.ownerId);
  if (!owner) return;
  playerHitMonster(sim, owner, t, coef, { noProcs: true });
}

function runHitProcs(sim: Simulation, p: Player, t: Monster, isPrimary: boolean): void {
  for (const it of Object.values(p.char.equipped)) {
    for (const h of itemHooks(it)) {
      if (h.kind !== 'onHitProc') continue;
      if (h.primaryOnly && !isPrimary) continue;
      const key = `${it?.legendaryId}:hit`;
      if (h.cooldown && (p.procCds.get(key) ?? 0) > sim.time) continue;
      if (!sim.rng.chance(h.chance)) continue;
      if (h.cooldown) p.procCds.set(key, sim.time + h.cooldown);
      runProc(sim, p, h.effect, t);
    }
  }
}

export function runProc(sim: Simulation, p: Player, e: ProcEffect, target: Monster | null): void {
  const weaponAvg = (p.stats.weaponMin + p.stats.weaponMax) / 2;
  switch (e.type) {
    case 'nova': {
      const at = target?.pos ?? p.pos;
      sim.emit({ t: 'fx', v: e.visual, x: at.x, y: at.y, r: e.radius });
      for (const u of sim.units.query(at.x, at.y, e.radius)) {
        if (u instanceof Monster && u.kind === 'monster' && !u.dead) playerHitMonster(sim, p, u, e.coef, { noProcs: true });
      }
      break;
    }
    case 'bleed':
      if (target) applyStatus(sim, target, { kind: 'bleed', coefPerSec: e.coefPerSec, duration: e.duration }, p, weaponAvg);
      break;
    case 'summon': {
      const existing = [...p.pets].map((id) => sim.monsters.get(id)).filter((m) => m && m.def.id === e.monsterId);
      if (existing.length >= e.max) break;
      sim.spawnMonster(e.monsterId, sim.scatter(p.pos, 1.2), { ownerId: p.id, ttl: e.duration, level: p.char.level });
      sim.emit({ t: 'fx', v: 'summon', x: p.pos.x, y: p.pos.y });
      break;
    }
    case 'buff':
      addBuff(sim, p, {
        id: e.id, name: e.name, left: e.duration, damagePct: e.damagePct ?? 0, damageReduction: e.damageReduction ?? 0,
        moveSpeedPct: e.moveSpeedPct ?? 0, attackSpeedPct: 0, immune: false, regenPct: 0,
      });
      if (e.healPct) healUnit(sim, p, p.maxHp * e.healPct);
      break;
  }
}

export function addBuff(sim: Simulation, p: Player, b: ActiveBuff): void {
  p.buffs = p.buffs.filter((x) => x.id !== b.id);
  p.buffs.push(b);
  p.changedTick = sim.tick;
  sim.emit({ t: 'fx', v: `buff_${b.id}`, x: p.pos.x, y: p.pos.y });
}

/** A monster (or environment, when src is null) damages a player. */
export function damagePlayer(sim: Simulation, p: Player, raw: number, src: Monster | null): number {
  if (p.dead || raw <= 0) return 0;
  if (p.immune) {
    sim.emit({ t: 'dmg', id: p.id, a: 0, x: p.pos.x, y: p.pos.y });
    return 0;
  }
  const level = src?.level ?? sim.scaling.monsterLevel;
  let dmg = raw * (1 - armorReduction(p.stats.armor, level));
  dmg *= 1 - Math.min(0.75, p.buffSum('damageReduction'));
  if (p.surging) dmg *= 1 + ECHO_SURGE_VULNERABILITY;
  dmg = Math.max(1, Math.round(dmg));
  p.hp -= dmg;
  p.lastCombat = sim.time;
  p.changedTick = sim.tick;
  sim.emit({ t: 'dmg', id: p.id, a: dmg, s: src?.id, x: p.pos.x, y: p.pos.y });

  for (const it of Object.values(p.char.equipped)) {
    for (const h of itemHooks(it)) {
      if (h.kind === 'onDamagedProc') {
        const key = `${it?.legendaryId}:dmg`;
        if ((p.procCds.get(key) ?? 0) > sim.time || !sim.rng.chance(h.chance)) continue;
        p.procCds.set(key, sim.time + h.cooldown);
        runProc(sim, p, h.effect, null);
      } else if (h.kind === 'onLowLife' && p.hp > 0 && p.hp / p.maxHp < h.threshold) {
        const key = `${it?.legendaryId}:low`;
        if ((p.procCds.get(key) ?? 0) > sim.time) continue;
        p.procCds.set(key, sim.time + h.cooldown);
        runProc(sim, p, h.effect, null);
      }
    }
  }

  if (p.hp <= 0) sim.killPlayer(p);
  return dmg;
}

export function healUnit(sim: Simulation, u: Unit, amount: number, announce = true): void {
  if (u.dead || amount <= 0) return;
  const before = u.hp;
  u.hp = Math.min(u.maxHp, u.hp + amount);
  if (u.hp !== before) {
    u.changedTick = sim.tick;
    if (announce && u.hp - before >= 1) sim.emit({ t: 'heal', id: u.id, a: Math.round(u.hp - before) });
  }
}

export function inCombat(sim: Simulation, p: Player): boolean {
  return sim.time - p.lastCombat < COMBAT_TIMEOUT;
}
