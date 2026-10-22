// Phone-sized shaft. Terrain and actors are the Avasia pixel set. The sim stays the source of truth.

import { STATIONS, swingFor, Tile, type Hub, type ShaftRun, type Station, type TileMap } from '@echo/game';
import { bake, blit } from './render/atlas.js';
import { actorSprite, dirOf, dropSprite, monsterSprite, propSprite, shardSprite, treeSprite } from './render/sprites.js';
import { terrainRaster } from './render/terrain.js';

const TILE = 54;
const CHUNK = 8;

const hits = new Map<number, number>();
const motion = new Map<number, { x: number; y: number; until: number }>();
const chunks = new WeakMap<TileMap, Map<string, HTMLCanvasElement>>();

const STALL: Record<Station['id'], { actor?: string; prop?: string }> = {
  shaft: { prop: 'beacon' },
  sell: { actor: 'merchant' },
  reforge: { actor: 'smith' },
  stash: { actor: 'porter' },
  loadout: { actor: 'civilian' },
  night: { prop: 'lamp' },
  rank: { prop: 'board' },
};

export interface Flash {
  facing: number;
  until: number;
  kind: 'swing' | 'whiff';
}

export function noteHit(id: number, now: number): void {
  hits.set(id, now);
}

export function resize(canvas: HTMLCanvasElement): { w: number; h: number; ctx: CanvasRenderingContext2D } {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
  }
  const ctx = canvas.getContext('2d')!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
  return { w, h, ctx };
}

export function screenToWorld(canvas: HTMLCanvasElement, clientX: number, clientY: number, camX: number, camY: number): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const sx = clientX - rect.left - rect.width / 2;
  const sy = clientY - rect.top - rect.height / 2;
  return { x: camX + sx / TILE, y: camY + sy / TILE };
}

function tileHash(x: number, y: number): number {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function chunk(map: TileMap, cx: number, cy: number, town: boolean): HTMLCanvasElement {
  let bag = chunks.get(map);
  if (!bag) {
    bag = new Map();
    chunks.set(map, bag);
  }
  const key = `${town ? 't' : 'd'}:${cx},${cy}`;
  const hit = bag.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = CHUNK * TILE;
  c.height = CHUNK * TILE;
  const g = c.getContext('2d')!;
  g.imageSmoothingEnabled = false;
  for (let ty = 0; ty < CHUNK; ty++) {
    for (let tx = 0; tx < CHUNK; tx++) paintTile(g, map, cx * CHUNK + tx, cy * CHUNK + ty, tx * TILE, ty * TILE, town);
  }
  bag.set(key, c);
  return c;
}

function paintTile(g: CanvasRenderingContext2D, map: TileMap, x: number, y: number, px: number, py: number, town: boolean): void {
  const t = map.get(x, y);
  const below = map.get(x, y + 1);
  const above = map.get(x, y - 1);
  const wall = (tt: number): boolean => tt === Tile.Rock || tt === Tile.Crystal || tt === Tile.Building;
  const front = t === Tile.Building && below !== Tile.Building;
  const faceSouth = (t === Tile.Rock || t === Tile.Crystal) && !wall(below) && below !== Tile.Water;
  let left = x;
  let right = x;
  if (t === Tile.Building) {
    while (map.get(left - 1, y) === Tile.Building) left--;
    while (map.get(right + 1, y) === Tile.Building) right++;
  }
  let brace: 'left' | 'right' | null = null;
  if (!town && t === Tile.Floor && tileHash(x, y) > 0.8) {
    const l = wall(map.get(x - 1, y));
    const r = wall(map.get(x + 1, y));
    if (l && !r) brace = 'left';
    else if (r && !l) brace = 'right';
  }
  const img = terrainRaster({
    tile: t,
    x,
    y,
    town,
    roof: '#6e4030',
    front,
    door: front && x === Math.floor((left + right) / 2),
    window: front && x !== Math.floor((left + right) / 2) && tileHash(x, y) > 0.45,
    leftEdge: t === Tile.Building && x === left,
    rightEdge: t === Tile.Building && x === right,
    faceSouth,
    lipNorth: (t === Tile.Rock || t === Tile.Crystal) && !faceSouth && !wall(above) && above !== Tile.Water,
    shadowNorth: !wall(t) && t !== Tile.Water && wall(above),
    eave: t === Tile.Building && below === Tile.Building && map.get(x, y + 2) !== Tile.Building,
    brace,
    chimney: town && t === Tile.Building && x === 32 && y === 7,
  }, 3);
  g.putImageData(new ImageData(img.rgba as Uint8ClampedArray<ArrayBuffer>, img.w, img.h), px, py);
}

function drawMap(ctx: CanvasRenderingContext2D, map: TileMap, camX: number, camY: number, w: number, h: number, town: boolean): { toX: (x: number) => number; toY: (y: number) => number } {
  const toX = (wx: number) => (wx - camX) * TILE + w / 2;
  const toY = (wy: number) => (wy - camY) * TILE + h / 2;
  ctx.fillStyle = '#100d0b';
  ctx.fillRect(0, 0, w, h);
  const x0 = Math.max(0, Math.floor((camX - w / TILE / 2) / CHUNK) - 1);
  const y0 = Math.max(0, Math.floor((camY - h / TILE / 2) / CHUNK) - 1);
  const x1 = Math.min(Math.ceil(map.w / CHUNK) - 1, Math.floor((camX + w / TILE / 2) / CHUNK) + 1);
  const y1 = Math.min(Math.ceil(map.h / CHUNK) - 1, Math.floor((camY + h / TILE / 2) / CHUNK) + 1);
  for (let cy = y0; cy <= y1; cy++) {
    for (let cx = x0; cx <= x1; cx++) {
      ctx.drawImage(chunk(map, cx, cy, town), Math.round(toX(cx * CHUNK)), Math.round(toY(cy * CHUNK)));
    }
  }
  return { toX, toY };
}

const INK = 1;

function shadow(ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number): void {
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function walking(id: number, x: number, y: number, now: number): boolean {
  const prev = motion.get(id);
  const moved = !prev || Math.hypot(x - prev.x, y - prev.y) > 0.015;
  if (!prev || moved) motion.set(id, { x, y, until: now + 160 });
  return !!prev && now < prev.until;
}

function actor(ctx: CanvasRenderingContext2D, id: string, facing: number, x: number, footY: number, now: number, moving: boolean, opts: { flip?: boolean; alpha?: number; flash?: boolean } = {}): void {
  const dir = dirOf(facing);
  const spec = actorSprite(id, dir, moving ? Math.floor(now / 150) & 1 : 0);
  blit(ctx, bake(spec.key, spec.rows, spec.scale ?? 2), x, footY, { flip: dir === 'w' || opts.flip, alpha: opts.alpha, flash: opts.flash, ink: INK });
}

function lamp(ctx: CanvasRenderingContext2D, w: number, h: number, x: number, y: number): void {
  ctx.save();
  const warm = ctx.createRadialGradient(x, y - TILE * 0.35, TILE * 0.15, x, y, TILE * 1.7);
  warm.addColorStop(0, 'rgba(255, 196, 130, 0.12)');
  warm.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'source-over';
  const g = ctx.createRadialGradient(x, y - TILE * 0.35, TILE * 2.6, x, y, Math.max(w, h) * 0.7);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(0.5, 'rgba(6,4,3,0.16)');
  g.addColorStop(1, 'rgba(2,1,1,0.72)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

interface Stamp {
  y: number;
  draw: () => void;
}

export function paint(canvas: HTMLCanvasElement, run: ShaftRun, flash: Flash | null, now: number): void {
  const { w, h, ctx } = resize(canvas);
  const p = run.player;
  const { toX, toY } = drawMap(ctx, run.sim.map, p.pos.x, p.pos.y, w, h, false);

  for (const z of run.sim.zones.values()) {
    ctx.beginPath();
    ctx.fillStyle = z.faction === 'players' ? 'rgba(233,196,154,0.22)' : 'rgba(200, 80, 50, 0.28)';
    ctx.arc(toX(z.pos.x), toY(z.pos.y), z.radius * TILE, 0, Math.PI * 2);
    ctx.fill();
  }

  const swing = flash && flash.until > now ? flash : null;
  if (swing) {
    const weapon = swingFor(run.save.equipped.weapon);
    const arc = weapon.kind === 'arc' ? (weapon.arc * Math.PI) / 180 : 0.6;
    const range = (weapon.kind === 'summon' ? 1.4 : weapon.range) * TILE;
    ctx.beginPath();
    ctx.moveTo(toX(p.pos.x), toY(p.pos.y));
    ctx.arc(toX(p.pos.x), toY(p.pos.y), range, swing.facing - arc / 2, swing.facing + arc / 2);
    ctx.closePath();
    ctx.fillStyle = swing.kind === 'whiff' ? 'rgba(233,196,154,0.16)' : 'rgba(200,52,60,0.34)';
    ctx.fill();
  }

  const stamps: Stamp[] = [];
  const map = run.sim.map;
  const x0 = Math.max(0, Math.floor(p.pos.x - w / TILE / 2) - 2);
  const y0 = Math.max(0, Math.floor(p.pos.y - h / TILE / 2) - 2);
  const x1 = Math.min(map.w - 1, Math.ceil(p.pos.x + w / TILE / 2) + 2);
  const y1 = Math.min(map.h - 1, Math.ceil(p.pos.y + h / TILE / 2) + 2);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (map.get(x, y) !== Tile.Tree) continue;
      const spec = treeSprite(tileHash(x, y) > 0.5 ? 1 : 0);
      const footX = toX(x + 0.5);
      const footY = toY(y + 1);
      stamps.push({
        y: y + 0.9,
        draw: () => {
          shadow(ctx, footX, footY, 16, 6);
          blit(ctx, bake(spec.key, spec.rows, spec.scale ?? 2), footX, footY, { ink: 2 });
        },
      });
    }
  }

  for (const loot of run.sim.loot.values()) {
    const x = toX(loot.pos.x);
    const y = toY(loot.pos.y);
    const spec = loot.kind === 'shards' ? shardSprite() : loot.kind === 'item' ? dropSprite(loot.item.rarity) : null;
    stamps.push({
      y: loot.pos.y,
      draw: () => {
        if (!spec) {
          ctx.beginPath();
          ctx.fillStyle = '#7dcea0';
          ctx.arc(x, y, 5, 0, Math.PI * 2);
          ctx.fill();
          return;
        }
        const bob = Math.sin(now / 220 + loot.pos.x) * 2;
        blit(ctx, bake(spec.key, spec.rows, spec.scale ?? 2), x, y + 10 + bob, { anchor: 'center', ink: 2 });
      },
    });
  }

  for (const m of run.sim.monsters.values()) {
    if (m.dead) continue;
    const x = toX(m.pos.x);
    const y = toY(m.pos.y);
    const spec = monsterSprite(m.def.id, m.def.shape);
    const move = walking(m.id, m.pos.x, m.pos.y, now);
    stamps.push({
      y: m.pos.y,
      draw: () => {
        shadow(ctx, x, y + TILE * 0.16, Math.max(10, m.radius * TILE * 0.7), 6);
        blit(ctx, bake(spec.key, spec.rows, spec.scale ?? 2), x, y + TILE * 0.22, {
          flip: m.def.shape !== 'boss' && dirOf(m.facing) === 'w',
          alpha: m.kind === 'pet' ? 0.82 : 1,
          flash: now - (hits.get(m.id) ?? 0) < 70,
          lift: move ? (Math.floor(now / 140) & 1 ? 2 : 0) : 0,
          ink: INK,
        });
        if (m.id === p.lockId) {
          ctx.strokeStyle = '#e9c49a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y - TILE * 0.2, TILE * 0.38, 0, Math.PI * 2);
          ctx.stroke();
        }
        if (m.tier === 'boss' || m.hp < m.maxHp) {
          const bw = m.tier === 'boss' ? 48 : 28;
          const by = y - TILE * 0.55;
          ctx.fillStyle = '#1a120c';
          ctx.fillRect(x - bw / 2, by, bw, 4);
          ctx.fillStyle = m.tier === 'boss' ? '#e0b04a' : '#d4544a';
          ctx.fillRect(x - bw / 2, by, bw * Math.max(0, m.hp / m.maxHp), 4);
        }
      },
    });
  }

  const px = toX(p.pos.x);
  const py = toY(p.pos.y);
  const moving = walking(p.id, p.pos.x, p.pos.y, now);
  stamps.push({
    y: p.pos.y,
    draw: () => {
      shadow(ctx, px, py + TILE * 0.2, 16, 6);
      actor(ctx, 'warden', p.facing, px, py + TILE * 0.24, now, moving && !p.dead, {
        alpha: p.dead ? 0.45 : 1,
        flash: now - (hits.get(p.id) ?? 0) < 70,
      });
      if (p.resource >= 80) {
        ctx.strokeStyle = `rgba(220,40,50,${0.45 + 0.25 * Math.sin(now / 90)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(px, py - TILE * 0.2, TILE * 0.42, 0, Math.PI * 2);
        ctx.stroke();
      }
    },
  });

  stamps.sort((a, b) => a.y - b.y);
  for (const stamp of stamps) stamp.draw();

  for (const pr of run.sim.projectiles.values()) {
    const x = toX(pr.pos.x);
    const y = toY(pr.pos.y);
    const col = pr.visual === 'fireball' ? '#ff8a2a' : pr.visual === 'bloodbolt' ? '#ff3a4a' : pr.faction === 'players' ? '#f3eadf' : '#d1263a';
    const r = Math.max(3, pr.radius * TILE);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const gr = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
    gr.addColorStop(0, '#ffffff');
    gr.addColorStop(0.4, col);
    gr.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  lamp(ctx, w, h, px, py - 10);
}

export function paintHub(canvas: HTMLCanvasElement, hub: Hub, now = performance.now()): void {
  const { w, h, ctx } = resize(canvas);
  const p = hub.player;
  const { toX, toY } = drawMap(ctx, hub.sim.map, p.pos.x, p.pos.y, w, h, true);
  const stamps: Stamp[] = [];
  const map = hub.sim.map;
  const x0 = Math.max(0, Math.floor(p.pos.x - w / TILE / 2) - 2);
  const y0 = Math.max(0, Math.floor(p.pos.y - h / TILE / 2) - 2);
  const x1 = Math.min(map.w - 1, Math.ceil(p.pos.x + w / TILE / 2) + 2);
  const y1 = Math.min(map.h - 1, Math.ceil(p.pos.y + h / TILE / 2) + 2);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      if (map.get(x, y) !== Tile.Tree) continue;
      const spec = treeSprite(tileHash(x, y) > 0.5 ? 1 : 0);
      const footX = toX(x + 0.5);
      const footY = toY(y + 1);
      stamps.push({
        y,
        draw: () => {
          shadow(ctx, footX, footY, 16, 6);
          blit(ctx, bake(spec.key, spec.rows, spec.scale ?? 2), footX, footY, { ink: 2 });
        },
      });
    }
  }
  ctx.font = '15px ui-sans-serif, system-ui, sans-serif';
  ctx.textAlign = 'center';
  for (const station of STATIONS) {
    const stall = STALL[station.id];
    const x = toX(station.x);
    const y = toY(station.y);
    stamps.push({
      y: station.y,
      draw: () => {
        shadow(ctx, x, y + TILE * 0.16, 14, 5);
        if (stall.actor) actor(ctx, stall.actor, Math.PI / 2, x, y + TILE * 0.22, now, false);
        if (stall.prop) {
          const spec = propSprite(stall.prop);
          blit(ctx, bake(spec.key, spec.rows, spec.scale ?? 2), x, y + TILE * 0.22, { ink: INK });
        }
        const labelY = y - TILE * 0.85;
        ctx.fillStyle = 'rgba(12,8,6,0.8)';
        ctx.fillText(station.name, x + 1, labelY + 1);
        ctx.fillStyle = '#f6efe4';
        ctx.fillText(station.name, x, labelY);
      },
    });
  }
  const px = toX(p.pos.x);
  const py = toY(p.pos.y);
  stamps.push({
    y: p.pos.y,
    draw: () => {
      shadow(ctx, px, py + TILE * 0.2, 16, 6);
      actor(ctx, 'warden', p.facing, px, py + TILE * 0.24, now, walking(p.id, p.pos.x, p.pos.y, now));
    },
  });
  stamps.sort((a, b) => a.y - b.y);
  for (const stamp of stamps) stamp.draw();
}
