// Procedural mine generation: rooms connected by a spanning tree plus a few loops,
// roughened with cellular automata so the result reads as a collapsed Anula pit.
// Fully deterministic from the seed — the server only has to remember the seed.

import { Rng, type Vec2 } from '../math.js';
import { Tile, TileMap } from './tilemap.js';

export interface Room {
  x: number;
  y: number;
  w: number;
  h: number;
  cx: number;
  cy: number;
}

export interface DungeonOptions {
  seed: number;
  width: number;
  height: number;
  rooms: number;
}

export interface DungeonLayout {
  map: TileMap;
  rooms: Room[];
  start: Vec2;
  /** Room furthest (by walking distance) from the start — boss arena. */
  bossRoom: Room;
  /** Walkable stand point in the boss room (snapped off walls). */
  bossPos: Vec2;
  /** Candidate pack positions, ordered roughly from start to far end. */
  packSpots: Vec2[];
}

export function generateDungeon(opts: DungeonOptions): DungeonLayout {
  const rng = new Rng(opts.seed);
  const { width: W, height: H } = opts;
  const map = new TileMap(W, H);

  // 1. Scatter rooms (rejection-sampled, small overlap allowed for organic caverns).
  const rooms: Room[] = [];
  let attempts = 0;
  while (rooms.length < opts.rooms && attempts++ < 600) {
    const w = rng.int(7, 14);
    const h = rng.int(6, 12);
    const x = rng.int(3, W - w - 4);
    const y = rng.int(3, H - h - 4);
    const r: Room = { x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
    const clash = rooms.some((o) => x < o.x + o.w + 3 && x + w + 3 > o.x && y < o.y + o.h + 3 && y + h + 3 > o.y);
    if (!clash) rooms.push(r);
  }

  for (const r of rooms) carveBlob(map, r, rng);

  // 2. Connect: Prim's MST over room centres, plus ~20% extra edges for loops.
  const connected = new Set<number>([0]);
  const edges: [number, number][] = [];
  while (connected.size < rooms.length) {
    let best: [number, number] | null = null;
    let bestD = Infinity;
    for (const a of connected) {
      for (let b = 0; b < rooms.length; b++) {
        if (connected.has(b)) continue;
        const d = (rooms[a]!.cx - rooms[b]!.cx) ** 2 + (rooms[a]!.cy - rooms[b]!.cy) ** 2;
        if (d < bestD) {
          bestD = d;
          best = [a, b];
        }
      }
    }
    if (!best) break;
    connected.add(best[1]);
    edges.push(best);
  }
  const extra = Math.max(1, Math.floor(rooms.length * 0.2));
  for (let i = 0; i < extra; i++) {
    const a = rng.int(0, rooms.length - 1);
    const b = rng.int(0, rooms.length - 1);
    if (a !== b) edges.push([a, b]);
  }
  for (const [a, b] of edges) carveTunnel(map, rooms[a]!, rooms[b]!, rng);

  // 3. Roughen walls with a couple of cellular-automata passes.
  roughen(map, rng, 2);

  // 4. Keep only what is reachable from the start room, then re-seal the border.
  const start = { x: Math.floor(rooms[0]!.cx) + 0.5, y: Math.floor(rooms[0]!.cy) + 0.5 };
  map.set(Math.floor(start.x), Math.floor(start.y), Tile.Floor);
  const distances = floodDistances(map, start);
  for (let i = 0; i < map.tiles.length; i++) {
    if (map.tiles[i] !== Tile.Rock && distances[i] === -1) map.tiles[i] = Tile.Rock;
  }
  for (let x = 0; x < W; x++) {
    map.set(x, 0, Tile.Rock);
    map.set(x, H - 1, Tile.Rock);
  }
  for (let y = 0; y < H; y++) {
    map.set(0, y, Tile.Rock);
    map.set(W - 1, y, Tile.Rock);
  }

  // 5. Anula seams: some rock touching open floor becomes glowing crystal.
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (map.get(x, y) !== Tile.Rock) continue;
      const open = countOpen(map, x, y);
      if (open >= 2 && rng.chance(0.045)) map.set(x, y, Tile.Crystal);
    }
  }

  // 6. Boss room = furthest room centre by walking distance.
  const roomDist = (r: Room): number => {
    const i = Math.floor(r.cy) * W + Math.floor(r.cx);
    return distances[i] ?? -1;
  };
  let bossRoom = rooms[rooms.length - 1]!;
  let far = -1;
  for (const r of rooms) {
    const d = roomDist(r);
    if (d > far) {
      far = d;
      bossRoom = r;
    }
  }

  // 7. Pack spots: a few points in each non-start room, sorted by distance from start.
  const packSpots: Vec2[] = [];
  for (const r of rooms) {
    if (r === rooms[0]) continue;
    const n = Math.max(1, Math.round((r.w * r.h) / 45));
    for (let k = 0; k < n; k++) {
      for (let tries = 0; tries < 12; tries++) {
        const p = { x: rng.range(r.x + 1, r.x + r.w - 1), y: rng.range(r.y + 1, r.y + r.h - 1) };
        if (!map.collides(p.x, p.y, 0.6)) {
          packSpots.push(p);
          break;
        }
      }
    }
  }
  // Corridor ambushes: sample open tiles far from rooms.
  for (let k = 0; k < Math.floor(rooms.length / 2); k++) {
    for (let tries = 0; tries < 40; tries++) {
      const p = { x: rng.int(2, W - 3) + 0.5, y: rng.int(2, H - 3) + 0.5 };
      if (map.collides(p.x, p.y, 0.6)) continue;
      const di = distances[Math.floor(p.y) * W + Math.floor(p.x)]!;
      if (di > 12) {
        packSpots.push(p);
        break;
      }
    }
  }
  packSpots.sort((a, b) => distances[Math.floor(a.y) * W + Math.floor(a.x)]! - distances[Math.floor(b.y) * W + Math.floor(b.x)]!);

  const bossPos = map.nearestOpen(bossRoom.cx, bossRoom.cy, 1.05);
  return { map, rooms, start, bossRoom, bossPos, packSpots };
}

function carveBlob(map: TileMap, r: Room, rng: Rng): void {
  // Ellipse-ish room with jittered edges.
  const rx = r.w / 2;
  const ry = r.h / 2;
  for (let y = r.y; y < r.y + r.h; y++) {
    for (let x = r.x; x < r.x + r.w; x++) {
      const nx = (x + 0.5 - r.cx) / rx;
      const ny = (y + 0.5 - r.cy) / ry;
      const d = nx * nx + ny * ny;
      if (d < 0.75 || (d < 1.05 && rng.chance(0.6))) map.set(x, y, Tile.Floor);
    }
  }
}

function carveTunnel(map: TileMap, a: Room, b: Room, rng: Rng): void {
  // Drunk-ish walk biased toward the target; 2–3 tiles wide.
  let x = a.cx;
  let y = a.cy;
  const width = rng.chance(0.5) ? 1 : 2;
  let guard = 0;
  while ((Math.abs(x - b.cx) > 1 || Math.abs(y - b.cy) > 1) && guard++ < 800) {
    const dx = b.cx - x;
    const dy = b.cy - y;
    if (rng.chance(0.75)) {
      if (Math.abs(dx) > Math.abs(dy)) x += Math.sign(dx);
      else y += Math.sign(dy);
    } else if (rng.chance(0.5)) {
      x += rng.chance(0.5) ? 1 : -1;
    } else {
      y += rng.chance(0.5) ? 1 : -1;
    }
    x = Math.max(2, Math.min(map.w - 3, x));
    y = Math.max(2, Math.min(map.h - 3, y));
    for (let oy = -width + 1; oy <= width - 1 + 1; oy++) {
      for (let ox = -width + 1; ox <= width - 1 + 1; ox++) {
        map.set(Math.floor(x) + ox, Math.floor(y) + oy, Tile.Floor);
      }
    }
  }
}

function countOpen(map: TileMap, x: number, y: number): number {
  let n = 0;
  for (let oy = -1; oy <= 1; oy++) {
    for (let ox = -1; ox <= 1; ox++) {
      if ((ox || oy) && map.get(x + ox, y + oy) !== Tile.Rock && map.get(x + ox, y + oy) !== Tile.Crystal) n++;
    }
  }
  return n;
}

function roughen(map: TileMap, rng: Rng, passes: number): void {
  for (let p = 0; p < passes; p++) {
    const next = map.tiles.slice();
    for (let y = 2; y < map.h - 2; y++) {
      for (let x = 2; x < map.w - 2; x++) {
        const open = countOpen(map, x, y);
        const i = y * map.w + x;
        if (map.tiles[i] === Tile.Rock && open >= 5 && rng.chance(0.7)) next[i] = Tile.Floor;
        else if (map.tiles[i] === Tile.Floor && open <= 2) next[i] = Tile.Rock;
      }
    }
    map.tiles.set(next);
  }
}

/** BFS walking distance from `from` to every tile (-1 = unreachable). */
export function floodDistances(map: TileMap, from: Vec2): Int32Array {
  const out = new Int32Array(map.w * map.h).fill(-1);
  const q = new Int32Array(map.w * map.h);
  const s = Math.floor(from.y) * map.w + Math.floor(from.x);
  if (map.solidAt(Math.floor(from.x), Math.floor(from.y))) return out;
  out[s] = 0;
  let head = 0;
  let tail = 0;
  q[tail++] = s;
  while (head < tail) {
    const i = q[head++]!;
    const x = i % map.w;
    const y = (i - x) / map.w;
    const n = [i - 1, i + 1, i - map.w, i + map.w];
    const ok = [x > 0, x < map.w - 1, y > 0, y < map.h - 1];
    for (let k = 0; k < 4; k++) {
      const j = n[k]!;
      if (!ok[k] || out[j] !== -1) continue;
      const jx = j % map.w;
      const jy = (j - jx) / map.w;
      if (map.solidAt(jx, jy)) continue;
      out[j] = out[i]! + 1;
      q[tail++] = j;
    }
  }
  return out;
}
