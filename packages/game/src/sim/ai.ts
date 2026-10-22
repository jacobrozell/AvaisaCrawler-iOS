// Monster, boss and pet behaviour. Movement follows the shared distance field
// (built from player positions) so packs flow through corridors without A*.

import { angleOf, fromAngle, norm, type MonsterAbility, type Vec2 } from '../bridge.js';
import { damagePlayer, healUnit, petHitMonster } from './combat.js';
import { Monster, Player, type Unit } from './entities.js';
import type { Simulation } from './Simulation.js';

const SEPARATION = 0.9;
const LEASH = 40;

export function updateMonsterAi(sim: Simulation, m: Monster, dt: number): void {
  for (let i = 0; i < m.abilityCds.length; i++) if (m.abilityCds[i]! > 0) m.abilityCds[i]! -= dt * m.attackSpeedMult;
  if (m.stunLeft > 0 || m.forced) return;

  if (m.def.ai === 'pet') return updatePet(sim, m, dt);
  if (m.def.ai === 'flee') return updateFleer(sim, m, dt);

  // Boss enrage phase at half life: faster everything.
  if (m.def.bossPhases && m.phase === 1 && m.hp < m.maxHp * 0.5) {
    m.phase = 2;
    m.speedMult *= 1.15;
    m.attackSpeedMult *= 1.35;
    sim.emit({ t: 'say', id: m.id, text: phaseLine(m) });
  }

  const target = pickTarget(sim, m);
  if (!target) {
    if (m.aggro) {
      m.aggro = false;
      m.targetId = 0;
    }
    return;
  }
  if (!m.aggro) {
    m.aggro = true;
    m.aggroAt = sim.time;
    if (m.tier === 'boss') sim.emit({ t: 'say', id: m.id, text: aggroLine(m) });
  }
  m.targetId = target.id;

  if (m.windup) {
    m.windup.left -= dt * m.attackSpeedMult;
    if (m.windup.ability.kind === 'melee' || m.windup.ability.kind === 'projectile') {
      // Track the target during short windups so attacks feel fair but readable.
      m.windup.target = { ...target.pos };
    }
    if (m.windup.left <= 0) {
      const w = m.windup;
      m.windup = null;
      resolveAbility(sim, m, w.ability, w.target, target);
      m.changedTick = sim.tick;
    }
    return;
  }

  const d = Math.hypot(target.pos.x - m.pos.x, target.pos.y - m.pos.y);
  const los = d < 16 && sim.map.lineOfSight(m.pos, target.pos);

  // Try abilities: specials first (in declared order after melee), then melee.
  if (los) {
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 0; i < m.abilities.length; i++) {
        const a = m.abilities[i]!;
        if ((pass === 0) === (a.kind === 'melee')) continue;
        if (m.abilityCds[i]! > 0) continue;
        if (!inRange(a, d, m, target)) continue;
        startWindup(sim, m, a, i, target);
        return;
      }
    }
  }

  // Move.
  let dir: Vec2 | null = null;
  const pref = m.def.preferredRange;
  if (pref && los) {
    if (d < pref - 1.5) dir = norm({ x: m.pos.x - target.pos.x, y: m.pos.y - target.pos.y });
    else if (d > pref + 1.5) dir = norm({ x: target.pos.x - m.pos.x, y: target.pos.y - m.pos.y });
    else {
      // Strafe around the target.
      const a = angleOf({ x: m.pos.x - target.pos.x, y: m.pos.y - target.pos.y }) + m.strafeDir * 0.9;
      const goal = { x: target.pos.x + Math.cos(a) * pref, y: target.pos.y + Math.sin(a) * pref };
      dir = norm({ x: goal.x - m.pos.x, y: goal.y - m.pos.y });
      if (sim.rng.chance(0.01)) m.strafeDir *= -1;
    }
  } else {
    const contact = m.radius + target.radius + 0.15;
    if (d <= contact) dir = null;
    else if (los && d < 7) dir = norm({ x: target.pos.x - m.pos.x, y: target.pos.y - m.pos.y });
    else dir = sim.field.descend(m.pos.x, m.pos.y) ?? (los ? norm({ x: target.pos.x - m.pos.x, y: target.pos.y - m.pos.y }) : null);
  }
  moveUnit(sim, m, dir, dt);
}

function inRange(a: MonsterAbility, d: number, m: Monster, t: Unit): boolean {
  switch (a.kind) {
    case 'melee':
      return d <= a.range + m.radius + t.radius;
    case 'heal':
      return true; // whether anyone needs it is decided in startWindup
    case 'pool':
      return a.range === 0 || d <= a.range;
    default:
      return d <= a.range;
  }
}

function startWindup(sim: Simulation, m: Monster, a: MonsterAbility, index: number, target: Unit): void {
  if (a.kind === 'heal') {
    const wounded = sim.units.query(m.pos.x, m.pos.y, a.radius).some((u) => u instanceof Monster && u.faction === 'monsters' && u.hp < u.maxHp * 0.8);
    if (!wounded) {
      m.abilityCds[index] = 1.5;
      return;
    }
  }
  m.abilityCds[index] = a.cooldown;
  const tpos = a.kind === 'pool' && a.range === 0 ? { ...m.pos } : { ...target.pos };
  m.windup = { ability: a, index, left: a.windup, target: tpos };
  m.facing = angleOf({ x: target.pos.x - m.pos.x, y: target.pos.y - m.pos.y });
  m.changedTick = sim.tick;
  const wind = a.windup / m.attackSpeedMult;
  switch (a.kind) {
    case 'slam':
      sim.emit({ t: 'tele', x: tpos.x, y: tpos.y, r: a.radius, d: wind });
      break;
    case 'pool':
      if (a.windup > 0) sim.emit({ t: 'tele', x: tpos.x, y: tpos.y, r: a.radius, d: wind });
      break;
    case 'charge':
      sim.emit({ t: 'tele', x: m.pos.x, y: m.pos.y, r: 0.8, d: wind, tx: tpos.x, ty: tpos.y, w: 0 });
      break;
    case 'nova':
    case 'summon':
    case 'heal':
      sim.emit({ t: 'cast', id: m.id, v: a.kind, x: m.pos.x, y: m.pos.y, tx: tpos.x, ty: tpos.y });
      break;
    default:
      break;
  }
  if (a.windup <= 0) {
    m.windup = null;
    resolveAbility(sim, m, a, tpos, target);
  }
}

function resolveAbility(sim: Simulation, m: Monster, a: MonsterAbility, at: Vec2, target: Unit): void {
  switch (a.kind) {
    case 'melee': {
      const d = Math.hypot(target.pos.x - m.pos.x, target.pos.y - m.pos.y);
      sim.emit({ t: 'cast', id: m.id, v: 'swipe', x: m.pos.x, y: m.pos.y, tx: target.pos.x, ty: target.pos.y });
      if (d <= a.range + m.radius + target.radius + 0.35 && target instanceof Player) damagePlayer(sim, target, m.damage * a.coef, m);
      break;
    }
    case 'projectile': {
      const base = angleOf({ x: at.x - m.pos.x, y: at.y - m.pos.y });
      const n = a.count ?? 1;
      const spread = ((a.spread ?? 0) * Math.PI) / 180;
      for (let i = 0; i < n; i++) {
        const off = n === 1 ? 0 : -spread / 2 + (spread * i) / (n - 1);
        sim.spawnProjectile(m.pos, fromAngle(base + off), {
          speed: a.speed, range: a.range, radius: 0.3, faction: 'monsters', ownerId: m.id, visual: a.visual, flat: m.damage * a.coef,
        });
      }
      break;
    }
    case 'nova':
      for (let i = 0; i < a.count; i++) {
        sim.spawnProjectile(m.pos, fromAngle((i / a.count) * Math.PI * 2 + sim.time), {
          speed: a.speed, range: a.range, radius: 0.3, faction: 'monsters', ownerId: m.id, visual: a.visual, flat: m.damage * a.coef,
        });
      }
      break;
    case 'slam':
      sim.emit({ t: 'fx', v: 'slam', x: at.x, y: at.y, r: a.radius });
      for (const u of sim.units.query(at.x, at.y, a.radius)) {
        if (u instanceof Player) damagePlayer(sim, u, m.damage * a.coef, m);
      }
      break;
    case 'charge': {
      const dir = norm({ x: at.x - m.pos.x, y: at.y - m.pos.y });
      const dist = Math.min(a.range, Math.hypot(at.x - m.pos.x, at.y - m.pos.y) + 1.5);
      m.forced = {
        vx: dir.x * a.speed,
        vy: dir.y * a.speed,
        left: dist / a.speed,
        hit: { flat: m.damage * a.coef, radius: m.radius + 0.4, hitIds: new Set() },
      };
      break;
    }
    case 'summon': {
      const alive = [...sim.monsters.values()].filter((x) => x.def.id === a.monsterId && !x.dead && x.kind === 'monster').length;
      if (alive > 30) break;
      for (let i = 0; i < a.count; i++) {
        const pos = sim.scatter(m.pos, a.range);
        const s = sim.spawnMonster(a.monsterId, pos, { level: m.level });
        s.dormant = false;
        s.aggro = true;
        s.targetId = target.id;
        // Summons give no loot or echo, to keep the meter honest.
        s.noReward = true;
        sim.emit({ t: 'fx', v: 'summon_red', x: pos.x, y: pos.y });
      }
      break;
    }
    case 'pool':
      sim.spawnZone(at, { radius: a.radius, duration: a.duration, faction: 'monsters', ownerId: m.id, visual: 'dust', flatPerSec: m.damage * a.coefPerSec });
      break;
    case 'heal':
      sim.emit({ t: 'fx', v: 'chant', x: m.pos.x, y: m.pos.y, r: a.radius });
      for (const u of sim.units.query(m.pos.x, m.pos.y, a.radius)) {
        if (u instanceof Monster && u.faction === 'monsters') healUnit(sim, u, u.maxHp * a.pct);
      }
      break;
  }
}

function pickTarget(sim: Simulation, m: Monster): Player | null {
  const current = m.targetId ? sim.players.get(m.targetId) : undefined;
  if (current && !current.dead) {
    const d = Math.hypot(current.pos.x - m.pos.x, current.pos.y - m.pos.y);
    if (d < LEASH) return current;
  }
  let best: Player | null = null;
  let bestD = m.aggro ? LEASH : m.def.aggroRange;
  for (const p of sim.players.values()) {
    if (p.dead) continue;
    const d = Math.hypot(p.pos.x - m.pos.x, p.pos.y - m.pos.y);
    if (d < bestD && (m.aggro || sim.map.lineOfSight(m.pos, p.pos))) {
      best = p;
      bestD = d;
    }
  }
  // Pack aggro: if a packmate nearby is fighting, join in.
  if (!best && !m.aggro) {
    for (const u of sim.units.query(m.pos.x, m.pos.y, 6)) {
      if (u instanceof Monster && u !== m && u.aggro && u.targetId) {
        const t = sim.players.get(u.targetId);
        if (t && !t.dead) return t;
      }
    }
  }
  return best;
}

export function moveUnit(sim: Simulation, m: Monster, dir: Vec2 | null, dt: number): void {
  let vx = dir ? dir.x : 0;
  let vy = dir ? dir.y : 0;
  // Separation from nearby units of the same faction so packs spread into a crowd.
  for (const u of sim.units.query(m.pos.x, m.pos.y, SEPARATION + m.radius)) {
    if (u === m || u.faction !== m.faction) continue;
    const dx = m.pos.x - u.pos.x;
    const dy = m.pos.y - u.pos.y;
    const d = Math.hypot(dx, dy) || 0.01;
    const overlap = m.radius + u.radius + 0.1 - d;
    if (overlap > 0) {
      vx += (dx / d) * overlap * 2.5;
      vy += (dy / d) * overlap * 2.5;
    }
  }
  if (!vx && !vy) return;
  const l = Math.hypot(vx, vy);
  const sp = m.def.speed * m.speedMult * m.slowMult * dt;
  const k = l > 1 ? sp / l : sp;
  const before = m.pos;
  m.pos = sim.map.move(m.pos, vx * k, vy * k, m.radius);
  if (m.pos.x !== before.x || m.pos.y !== before.y) {
    if (dir) m.facing = angleOf(dir);
    m.changedTick = sim.tick;
  }
}

function updatePet(sim: Simulation, m: Monster, dt: number): void {
  const owner = sim.players.get(m.ownerId);
  if (!owner || owner.dead) {
    sim.remove(m.id);
    return;
  }
  const dOwner = Math.hypot(owner.pos.x - m.pos.x, owner.pos.y - m.pos.y);
  if (dOwner > 16) {
    m.pos = sim.scatter(owner.pos, 1.2);
    m.changedTick = sim.tick;
    return;
  }
  // Nearest live enemy close to the owner.
  let target: Monster | null = null;
  let best = 9;
  for (const u of sim.units.query(owner.pos.x, owner.pos.y, 9)) {
    if (!(u instanceof Monster) || u.faction !== 'monsters' || u.dead) continue;
    const d = Math.hypot(u.pos.x - m.pos.x, u.pos.y - m.pos.y);
    if (d < best) {
      best = d;
      target = u;
    }
  }
  const bite = m.abilities[0];
  if (target && bite && bite.kind === 'melee') {
    const reach = bite.range + m.radius + target.radius;
    if (best <= reach) {
      if (m.abilityCds[0]! <= 0) {
        m.abilityCds[0] = bite.cooldown;
        m.facing = angleOf({ x: target.pos.x - m.pos.x, y: target.pos.y - m.pos.y });
        sim.emit({ t: 'cast', id: m.id, v: 'bite', x: m.pos.x, y: m.pos.y, tx: target.pos.x, ty: target.pos.y });
        petHitMonster(sim, m, target, bite.coef);
      }
      return;
    }
    moveUnit(sim, m, norm({ x: target.pos.x - m.pos.x, y: target.pos.y - m.pos.y }), dt);
    return;
  }
  if (dOwner > 2.5) moveUnit(sim, m, norm({ x: owner.pos.x - m.pos.x, y: owner.pos.y - m.pos.y }), dt);
}

function updateFleer(sim: Simulation, m: Monster, dt: number): void {
  // The Tithe-Runner: waits, bolts when threatened, escapes down a shaft if not caught.
  let nearest: Player | null = null;
  let nd = Infinity;
  for (const p of sim.players.values()) {
    if (p.dead) continue;
    const d = Math.hypot(p.pos.x - m.pos.x, p.pos.y - m.pos.y);
    if (d < nd) {
      nd = d;
      nearest = p;
    }
  }
  if (!m.aggro && nearest && nd < m.def.aggroRange) {
    m.aggro = true;
    m.aggroAt = sim.time;
    sim.emit({ t: 'say', id: m.id, text: 'The tithe! Protect the tithe!' });
  }
  if (!m.aggro || !nearest) return;
  if (m.def.escapeAfter && sim.time - m.aggroAt > m.def.escapeAfter) {
    sim.emit({ t: 'fx', v: 'escape', x: m.pos.x, y: m.pos.y });
    sim.emit({ t: 'say', id: m.id, text: '...down the shaft, with the tithe.' });
    sim.remove(m.id);
    return;
  }
  // Ascend the distance field (away from players), falling back to straight-line flight.
  let best: Vec2 | null = null;
  let bestScore = -1;
  for (let k = 0; k < 8; k++) {
    const dir = fromAngle((k / 8) * Math.PI * 2);
    const probe = { x: m.pos.x + dir.x * 1.5, y: m.pos.y + dir.y * 1.5 };
    if (sim.map.collides(probe.x, probe.y, m.radius)) continue;
    const score = Math.min(60, sim.field.at(probe.x, probe.y)) + sim.rng.next() * 0.5;
    if (score > bestScore) {
      bestScore = score;
      best = dir;
    }
  }
  moveUnit(sim, m, best ?? norm({ x: m.pos.x - nearest.pos.x, y: m.pos.y - nearest.pos.y }), dt);
}

function aggroLine(m: Monster): string {
  switch (m.def.id) {
    case 'brother_varn':
      return 'Do you hear it? The warmth under the skin. Let the Many speak!';
    case 'hollow_foreman':
      return 'SHIFT... NOT... OVER.';
    case 'choir_of_scars':
      return 'We were seven miners. Now we are one song.';
    case 'mother_of_mites':
      return '(The crystal walls begin to chitter.)';
    default:
      return 'The Echo answers!';
  }
}

function phaseLine(m: Monster): string {
  switch (m.def.id) {
    case 'brother_varn':
      return 'Vashirr was too timid. Order is a cage. BLEED AND BE FREE!';
    case 'hollow_foreman':
      return 'OVERTIME.';
    case 'choir_of_scars':
      return 'Louder. LOUDER.';
    default:
      return 'The Echo deepens.';
  }
}
