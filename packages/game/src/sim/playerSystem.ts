// Stick sets facing. Main hits the closest enemy in the weapon arc, or whiffs.
// Artifact buttons spend the cost written on the item. Empty buttons do nothing.

import {
  ACTION_SLOTS,
  BTN,
  POTION_COOLDOWN,
  POTION_HEAL_PCT,
  actFor,
  angleDiff,
  angleOf,
  fromAngle,
  itemHooks,
  norm,
  swingFor,
  type ActDef,
  type ActionSlot,
  type SkillEffect,
  type StatusDef,
  type SwingDef,
  type Vec2,
} from '../bridge.js';
import { addBuff, healUnit, inCombat, playerHitMonster, runProc } from './combat.js';
import { Monster, type Player } from './entities.js';
import type { Simulation } from './Simulation.js';

const STICK_DEAD = 0.18;
const TURN_AWAY = 0.85;

export function updatePlayer(sim: Simulation, p: Player, dt: number): void {
  if (p.dead) return;

  for (const s of ACTION_SLOTS) if (p.cooldowns[s] > 0) p.cooldowns[s] = Math.max(0, p.cooldowns[s] - dt);
  if (p.potionCd > 0) p.potionCd = Math.max(0, p.potionCd - dt);
  if (p.castLock > 0) p.castLock = Math.max(0, p.castLock - dt);
  if (p.buffs.length) {
    for (const b of p.buffs) {
      b.left -= dt;
      if (b.regenPct) healUnit(sim, p, p.maxHp * b.regenPct * dt, false);
    }
    const before = p.buffs.length;
    p.buffs = p.buffs.filter((b) => b.left > 0);
    if (before !== p.buffs.length) p.changedTick = sim.tick;
  }

  if (p.hp < p.maxHp) {
    p.regenCarry += p.stats.lifeRegen * dt;
    if (p.regenCarry >= 1) {
      const whole = Math.floor(p.regenCarry);
      p.regenCarry -= whole;
      healUnit(sim, p, whole, false);
    }
  }

  const res = p.resourceDef;
  if (res.decayOutOfCombat && !inCombat(sim, p)) p.resource = Math.max(0, p.resource - res.decayOutOfCombat * dt);

  const mag = Math.hypot(p.input.mx, p.input.my);
  const stickActive = mag > STICK_DEAD;
  const stickAngle = stickActive ? angleOf({ x: p.input.mx, y: p.input.my }) : p.facing;
  let lock = sim.monsters.get(p.input.lock);
  if (!lock || lock.dead || lock.kind === 'pet') lock = undefined;
  if (lock && stickActive) {
    const to = angleOf({ x: lock.pos.x - p.pos.x, y: lock.pos.y - p.pos.y });
    if (Math.abs(angleDiff(stickAngle, to)) > TURN_AWAY) lock = undefined;
  }
  p.lockId = lock?.id ?? 0;
  if (lock) p.facing = angleOf({ x: lock.pos.x - p.pos.x, y: lock.pos.y - p.pos.y });
  else if (stickActive) p.facing = stickAngle;

  p.ackSeq = p.input.seq;
  if (!p.forced && p.stunLeft <= 0 && stickActive) {
    const dir = norm({ x: p.input.mx, y: p.input.my });
    const sp = p.moveSpeed * dt;
    p.pos = sim.map.move(p.pos, dir.x * sp, dir.y * sp, p.radius);
    p.changedTick = sim.tick;
  }

  const pressed = p.input.buttons & ~p.prevButtons;
  p.prevButtons = p.input.buttons;
  if (pressed & BTN.draught) usePotion(sim, p);

  if (sim.peaceful || p.stunLeft > 0 || p.castLock > 0 || p.forced) return;

  for (const slot of ['a2', 'a1', 'a0'] as const) {
    if (!(pressed & BTN[slot])) continue;
    if (tryArtifact(sim, p, slot)) return;
  }
  if (p.input.buttons & BTN.main) tryMain(sim, p);
}

export function usePotion(sim: Simulation, p: Player): boolean {
  if (p.dead || p.potionCd > 0 || p.hp >= p.maxHp) return false;
  p.potionCd = POTION_COOLDOWN;
  healUnit(sim, p, p.maxHp * POTION_HEAL_PCT);
  sim.emit({ t: 'fx', v: 'potion', x: p.pos.x, y: p.pos.y });
  return true;
}

export function gainResource(p: Player, amount: number): void {
  const res = p.resourceDef;
  p.resource = Math.min(res.max, p.resource + amount * (1 + p.stats.resourceGen));
}

function hooksOf(p: Player) {
  const out = [];
  for (const it of Object.values(p.char.equipped)) out.push(...itemHooks(it));
  return out;
}

function tryMain(sim: Simulation, p: Player): boolean {
  if (p.cooldowns.main > 0) return false;
  const swing = swingFor(p.char.equipped.weapon);
  const aps = Math.max(0.25, p.stats.attacksPerSecond * (1 + p.buffSum('attackSpeedPct')));
  p.castLock = swing.castTime / aps;
  const aim = aimPoint(p);
  sim.emit({ t: 'cast', id: p.id, v: 'main', x: p.pos.x, y: p.pos.y, tx: aim.x, ty: aim.y });
  if (swing.kind === 'arc') {
    const target = closestInArc(sim, p, swing.range, swing.arc);
    sim.emit({ t: 'fx', v: target ? 'swing' : 'whiff', x: p.pos.x, y: p.pos.y, r: swing.range, tx: aim.x, ty: aim.y });
    if (!target) return true;
    playerHitMonster(sim, p, target, swing.coef, { slot: 'main' });
    gainResource(p, swing.echoOnHit);
    return true;
  }
  if (swing.kind === 'projectile') {
    fireProjectiles(sim, p, swing, 'main', swing.echoOnHit);
    return true;
  }
  summon(sim, p, swing.monsterId, swing.count, swing.duration);
  gainResource(p, swing.echoOnCast);
  return true;
}

function tryArtifact(sim: Simulation, p: Player, slot: 'a0' | 'a1' | 'a2'): boolean {
  const item = p.char.equipped[slot === 'a0' ? 'artifact0' : slot === 'a1' ? 'artifact1' : 'artifact2'];
  const act = actFor(item);
  if (!act || p.cooldowns[slot] > 0) return false;
  const cost = act.cost * (1 - p.stats.costReduction);
  if (p.resource < cost) return false;
  p.resource -= cost;
  if (act.cooldown > 0) p.cooldowns[slot] = artifactCooldown(p, act);
  p.castLock = act.castTime;
  const aim = aimPoint(p);
  sim.emit({ t: 'cast', id: p.id, v: act.id, x: p.pos.x, y: p.pos.y, tx: aim.x, ty: aim.y });
  for (const e of act.effects) runEffect(sim, p, slot, e, aim, () => {});
  return true;
}

function artifactCooldown(p: Player, act: ActDef): number {
  let cd = act.cooldown * (1 - p.stats.cooldownReduction);
  if (act.tags.includes('ultimate')) cd *= 1 - Math.min(0.5, p.stats.ultimateCdr);
  if (act.tags.includes('mobility')) {
    for (const h of hooksOf(p)) if (h.kind === 'mobility') cd *= h.cooldownMult;
  }
  return Math.max(0.15, cd);
}

function aimPoint(p: Player): Vec2 {
  return { x: p.pos.x + Math.cos(p.facing) * 2, y: p.pos.y + Math.sin(p.facing) * 2 };
}

function closestInArc(sim: Simulation, p: Player, range: number, arcDeg: number): Monster | null {
  const half = (arcDeg / 2) * Math.PI / 180;
  let best: Monster | null = null;
  let bestD = Infinity;
  for (const u of sim.units.query(p.pos.x, p.pos.y, range)) {
    if (!(u instanceof Monster) || u.kind === 'pet' || u.dead) continue;
    const dx = u.pos.x - p.pos.x;
    const dy = u.pos.y - p.pos.y;
    const d = Math.hypot(dx, dy);
    const close = d < u.radius + p.radius + 0.25;
    if (!close && Math.abs(angleDiff(angleOf({ x: dx, y: dy }), p.facing)) > half) continue;
    if (!sim.map.lineOfSight(p.pos, u.pos)) continue;
    if (d < bestD) {
      bestD = d;
      best = u;
    }
  }
  return best;
}

function fireProjectiles(sim: Simulation, p: Player, swing: Extract<SwingDef, { kind: 'projectile' }>, slot: ActionSlot, echoOnHit: number): void {
  const count = swing.count ?? 1;
  const spread = ((swing.spread ?? 0) * Math.PI) / 180;
  for (let i = 0; i < count; i++) {
    const off = count === 1 ? 0 : -spread / 2 + (spread * i) / (count - 1);
    const dir = fromAngle(p.facing + off);
    const pr = sim.spawnProjectile(
      { x: p.pos.x + dir.x * 0.5, y: p.pos.y + dir.y * 0.5 },
      dir,
      {
        speed: swing.speed, range: swing.range, radius: swing.radius, faction: 'players', ownerId: p.id, visual: swing.visual,
        coef: swing.coef, pierce: swing.pierce, skillSlot: slot,
      },
    );
    pr.echoOnHit = echoOnHit;
  }
}

function summon(sim: Simulation, p: Player, monsterId: string, count: number, duration: number): void {
  const mine = [...p.pets].map((id) => sim.monsters.get(id)).filter((m) => m && m.def.id === monsterId);
  const overflow = mine.length + count - count * 2;
  for (let i = 0; i < overflow; i++) sim.remove(mine[i]!.id);
  for (let i = 0; i < count; i++) sim.spawnMonster(monsterId, sim.scatter(p.pos, 1.4), { ownerId: p.id, ttl: duration, level: p.char.level });
  sim.emit({ t: 'fx', v: 'summon', x: p.pos.x, y: p.pos.y, r: 2 });
}

function clampTarget(sim: Simulation, from: Vec2, aim: Vec2, maxRange: number): Vec2 {
  const dx = aim.x - from.x;
  const dy = aim.y - from.y;
  const d = Math.hypot(dx, dy);
  const target = d > maxRange ? { x: from.x + (dx / d) * maxRange, y: from.y + (dy / d) * maxRange } : { ...aim };
  return sim.map.castCircle(from, target, 0.1);
}

function runEffect(sim: Simulation, p: Player, slot: ActionSlot, e: SkillEffect, aim: Vec2, onHit: () => void): void {
  switch (e.type) {
    case 'melee': {
      const half = ((e.arc / 2) * Math.PI) / 180;
      for (const u of sim.units.query(p.pos.x, p.pos.y, e.range)) {
        if (!(u instanceof Monster) || u.kind === 'pet' || u.dead) continue;
        const a = angleOf({ x: u.pos.x - p.pos.x, y: u.pos.y - p.pos.y });
        const close = Math.hypot(u.pos.x - p.pos.x, u.pos.y - p.pos.y) < u.radius + p.radius + 0.2;
        if (!close && Math.abs(angleDiff(a, p.facing)) > half) continue;
        if (!sim.map.lineOfSight(p.pos, u.pos)) continue;
        playerHitMonster(sim, p, u, e.coef, { slot, applies: e.applies });
        onHit();
      }
      sim.emit({ t: 'fx', v: 'swing', x: p.pos.x, y: p.pos.y, r: e.range, tx: aim.x, ty: aim.y });
      break;
    }
    case 'projectile': {
      const count = e.count ?? 1;
      const spread = ((e.spread ?? 0) * Math.PI) / 180;
      for (let i = 0; i < count; i++) {
        const off = count === 1 ? 0 : -spread / 2 + (spread * i) / (count - 1);
        const dir = fromAngle(p.facing + off);
        sim.spawnProjectile(
          { x: p.pos.x + dir.x * 0.5, y: p.pos.y + dir.y * 0.5 },
          dir,
          {
            speed: e.speed, range: e.range, radius: e.radius, faction: 'players', ownerId: p.id, visual: e.visual,
            coef: e.coef, pierce: e.pierce, explodeRadius: e.explodeRadius, applies: e.applies, skillSlot: slot,
          },
        );
      }
      break;
    }
    case 'aoeTarget': {
      const at = clampTarget(sim, p.pos, aim, e.maxRange);
      if (e.delay) {
        sim.emit({ t: 'tele', x: at.x, y: at.y, r: e.radius, d: e.delay, w: 1 });
        sim.strikes.push({ pos: at, radius: e.radius, left: e.delay, faction: 'players', ownerId: p.id, coef: e.coef, flat: 0, applies: e.applies, visual: e.visual, skillSlot: slot });
      } else {
        sim.emit({ t: 'fx', v: e.visual, x: at.x, y: at.y, r: e.radius });
        hitArea(sim, p, at, e.radius, e.coef, slot, e.applies, onHit);
      }
      break;
    }
    case 'aoeSelf':
      sim.emit({ t: 'fx', v: e.visual, x: p.pos.x, y: p.pos.y, r: e.radius });
      hitArea(sim, p, p.pos, e.radius, e.coef, slot, e.applies, onHit);
      break;
    case 'dash': {
      const dir = fromAngle(p.facing);
      const dest = sim.map.castCircle(p.pos, { x: p.pos.x + dir.x * e.distance, y: p.pos.y + dir.y * e.distance }, p.radius);
      const mobility = hooksOf(p).filter((h) => h.kind === 'mobility');
      if (e.blink) {
        sim.emit({ t: 'fx', v: e.visual, x: p.pos.x, y: p.pos.y, tx: dest.x, ty: dest.y });
        p.pos = dest;
        p.changedTick = sim.tick;
        hitArea(sim, p, dest, e.radius, e.coef, slot, e.applies, onHit);
      } else {
        const d = Math.hypot(dest.x - p.pos.x, dest.y - p.pos.y);
        const speed = 28;
        p.forced = {
          vx: dir.x * speed, vy: dir.y * speed, left: d / speed,
          hit: { coef: e.coef, radius: e.radius, applies: e.applies, hitIds: new Set() },
          visual: e.visual, slot,
        };
        sim.emit({ t: 'fx', v: e.visual, x: p.pos.x, y: p.pos.y, tx: dest.x, ty: dest.y });
      }
      for (const h of mobility) {
        if (h.kind !== 'mobility') continue;
        if (h.arrivalCoef > 0) {
          sim.strikes.push({
            pos: { ...dest }, radius: h.arrivalRadius, left: 0.2, faction: 'players', ownerId: p.id,
            coef: h.arrivalCoef, flat: 0, visual: 'malkos', skillSlot: slot,
          });
        }
        if (h.buff) runProc(sim, p, h.buff, null);
      }
      break;
    }
    case 'buff':
      addBuff(sim, p, {
        id: e.buff.id, name: e.buff.name, left: e.buff.duration, damagePct: e.buff.damagePct ?? 0,
        damageReduction: e.buff.damageReduction ?? 0, moveSpeedPct: e.buff.moveSpeedPct ?? 0,
        attackSpeedPct: e.buff.attackSpeedPct ?? 0, immune: e.buff.immune ?? false, regenPct: e.buff.regenPct ?? 0,
      });
      break;
    case 'heal':
      healUnit(sim, p, p.maxHp * e.pct);
      break;
    case 'summon':
      summon(sim, p, e.monsterId, e.count, e.duration);
      break;
    case 'zone': {
      const at = clampTarget(sim, p.pos, aim, e.maxRange);
      const z = sim.spawnZone(at, { radius: e.radius, duration: e.duration, faction: 'players', ownerId: p.id, visual: e.visual, coefPerSec: e.coefPerSec, applies: e.applies });
      z.skillSlot = slot;
      break;
    }
  }
}

function hitArea(sim: Simulation, p: Player, at: Vec2, radius: number, coef: number, slot: ActionSlot, applies: StatusDef | undefined, onHit: () => void): void {
  for (const u of sim.units.query(at.x, at.y, radius)) {
    if (!(u instanceof Monster) || u.kind === 'pet' || u.dead) continue;
    playerHitMonster(sim, p, u, coef, { slot, applies });
    onHit();
  }
}
