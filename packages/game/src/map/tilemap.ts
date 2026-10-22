// Tile grid + collision shared by server (authoritative) and client (prediction).

import type { Vec2 } from '../math.js';

export const Tile = {
  Rock: 0,
  Floor: 1,
  Road: 2,
  Water: 3,
  Building: 4,
  Tree: 5,
  Crystal: 6,
  Plank: 7,
} as const;
export type TileId = (typeof Tile)[keyof typeof Tile];

// btoa/atob exist in browsers and Node >= 16 but not in the ES lib typings.
const b64 = globalThis as unknown as { btoa(s: string): string; atob(s: string): string };

const SOLID = new Uint8Array(16);
SOLID[Tile.Rock] = 1;
SOLID[Tile.Water] = 1;
SOLID[Tile.Building] = 1;
SOLID[Tile.Tree] = 1;
SOLID[Tile.Crystal] = 1;

export class TileMap {
  constructor(
    readonly w: number,
    readonly h: number,
    readonly tiles: Uint8Array = new Uint8Array(w * h),
  ) {}

  get(x: number, y: number): number {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return Tile.Rock;
    return this.tiles[y * this.w + x]!;
  }

  set(x: number, y: number, t: number): void {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return;
    this.tiles[y * this.w + x] = t;
  }

  solidAt(tx: number, ty: number): boolean {
    return SOLID[this.get(tx, ty)] === 1;
  }

  /** Is a world-space point inside a solid tile? */
  solidPoint(x: number, y: number): boolean {
    return this.solidAt(Math.floor(x), Math.floor(y));
  }

  /** Nearest tile centre that a circle of radius `r` can stand on. */
  nearestOpen(x: number, y: number, r: number): Vec2 {
    if (!this.collides(x, y, r)) return { x, y };
    for (let rad = 1; rad <= 10; rad++) {
      for (let dy = -rad; dy <= rad; dy++) {
        for (let dx = -rad; dx <= rad; dx++) {
          if (Math.abs(dx) !== rad && Math.abs(dy) !== rad) continue;
          const p = { x: Math.floor(x) + dx + 0.5, y: Math.floor(y) + dy + 0.5 };
          if (!this.collides(p.x, p.y, r)) return p;
        }
      }
    }
    return { x, y };
  }

  /** Axis-aligned circle-vs-grid overlap test (circle approximated by its bounding box). */
  collides(x: number, y: number, r: number): boolean {
    const x0 = Math.floor(x - r);
    const x1 = Math.floor(x + r);
    const y0 = Math.floor(y - r);
    const y1 = Math.floor(y + r);
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        if (this.solidAt(tx, ty)) return true;
      }
    }
    return false;
  }

  /**
   * Move a circle by (dx, dy), sliding along walls. Sub-steps keep fast movers
   * (dashes, charges) from tunnelling through one-tile walls.
   */
  move(pos: Vec2, dx: number, dy: number, r: number): Vec2 {
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dx), Math.abs(dy)) / 0.2));
    const sx = dx / steps;
    const sy = dy / steps;
    let x = pos.x;
    let y = pos.y;
    for (let i = 0; i < steps; i++) {
      if (sx !== 0 && !this.collides(x + sx, y, r)) x += sx;
      if (sy !== 0 && !this.collides(x, y + sy, r)) y += sy;
    }
    return { x, y };
  }

  /** True if nothing solid lies on the segment a→b (sampled every 0.25 tiles). */
  lineOfSight(a: Vec2, b: Vec2): boolean {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const n = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 0.25));
    for (let i = 1; i < n; i++) {
      if (this.solidPoint(a.x + (dx * i) / n, a.y + (dy * i) / n)) return false;
    }
    return true;
  }

  /** Furthest walkable point along a→b for a circle of radius r (used by blinks). */
  castCircle(a: Vec2, b: Vec2, r: number): Vec2 {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const n = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 0.2));
    let last = a;
    for (let i = 1; i <= n; i++) {
      const p = { x: a.x + (dx * i) / n, y: a.y + (dy * i) / n };
      if (this.collides(p.x, p.y, r)) break;
      last = p;
    }
    return last;
  }

  toBase64(): string {
    let s = '';
    for (let i = 0; i < this.tiles.length; i++) s += String.fromCharCode(this.tiles[i]!);
    return b64.btoa(s);
  }

  static fromBase64(w: number, h: number, data: string): TileMap {
    const s = b64.atob(data);
    const tiles = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) tiles[i] = s.charCodeAt(i);
    return new TileMap(w, h, tiles);
  }
}

/**
 * Multi-source BFS distance field over walkable tiles. Monsters descend this
 * gradient toward the nearest player, which handles winding mine corridors
 * without per-monster A*. Cost is O(tiles within maxDist) per rebuild.
 */
export class DistanceField {
  readonly dist: Uint16Array;
  private queue: Int32Array;
  static readonly FAR = 0xffff;

  constructor(private readonly map: TileMap) {
    this.dist = new Uint16Array(map.w * map.h).fill(DistanceField.FAR);
    this.queue = new Int32Array(map.w * map.h);
  }

  build(sources: readonly Vec2[], maxDist: number): void {
    const { map, dist, queue } = this;
    dist.fill(DistanceField.FAR);
    let head = 0;
    let tail = 0;
    for (const s of sources) {
      const tx = Math.floor(s.x);
      const ty = Math.floor(s.y);
      if (map.solidAt(tx, ty)) continue;
      const i = ty * map.w + tx;
      if (dist[i] === 0) continue;
      dist[i] = 0;
      queue[tail++] = i;
    }
    const w = map.w;
    const h = map.h;
    const tiles = map.tiles;
    while (head < tail) {
      const i = queue[head++]!;
      const nd = dist[i]! + 1;
      if (nd > maxDist) continue;
      const x = i % w;
      const y = (i - x) / w;
      // 4-neighbourhood keeps the field consistent with corridor walls.
      for (let k = 0; k < 4; k++) {
        let j: number;
        if (k === 0) { if (x === 0) continue; j = i - 1; }
        else if (k === 1) { if (x === w - 1) continue; j = i + 1; }
        else if (k === 2) { if (y === 0) continue; j = i - w; }
        else { if (y === h - 1) continue; j = i + w; }
        if (dist[j]! <= nd || SOLID[tiles[j]!] === 1) continue;
        dist[j] = nd;
        queue[tail++] = j;
      }
    }
  }

  at(x: number, y: number): number {
    const tx = Math.floor(x);
    const ty = Math.floor(y);
    if (tx < 0 || ty < 0 || tx >= this.map.w || ty >= this.map.h) return DistanceField.FAR;
    return this.dist[ty * this.map.w + tx]!;
  }

  /** Unit direction toward the lowest neighbouring distance (8-neighbourhood). */
  descend(x: number, y: number): Vec2 | null {
    const tx = Math.floor(x);
    const ty = Math.floor(y);
    let best = this.at(x, y);
    if (best === DistanceField.FAR || best === 0) return null;
    let bx = 0;
    let by = 0;
    for (let oy = -1; oy <= 1; oy++) {
      for (let ox = -1; ox <= 1; ox++) {
        if (!ox && !oy) continue;
        // Don't cut corners diagonally through walls.
        if (ox && oy && (this.map.solidAt(tx + ox, ty) || this.map.solidAt(tx, ty + oy))) continue;
        const d = this.at(tx + ox + 0.5, ty + oy + 0.5);
        if (d < best) {
          best = d;
          bx = ox;
          by = oy;
        }
      }
    }
    if (!bx && !by) return null;
    // Aim at the centre of the chosen tile for smooth corridor following.
    const cx = tx + bx + 0.5 - x;
    const cy = ty + by + 0.5 - y;
    const l = Math.hypot(cx, cy) || 1;
    return { x: cx / l, y: cy / l };
  }
}
