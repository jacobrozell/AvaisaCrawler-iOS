// Uniform-grid spatial hash. Rebuilt every tick (O(n)); queries are O(cells touched).
// Used for combat hit tests, monster separation, and area-of-interest replication.

import type { Entity } from './entities.js';

export class SpatialHash<T extends Entity = Entity> {
  private cells = new Map<number, T[]>();

  constructor(private readonly cellSize = 4) {}

  private key(cx: number, cy: number): number {
    return (cx + 32768) * 65536 + (cy + 32768);
  }

  clear(): void {
    this.cells.clear();
  }

  insert(e: T): void {
    const k = this.key(Math.floor(e.pos.x / this.cellSize), Math.floor(e.pos.y / this.cellSize));
    let c = this.cells.get(k);
    if (!c) {
      c = [];
      this.cells.set(k, c);
    }
    c.push(e);
  }

  /** Entities whose centre lies within `r` (+ their own radius) of (x, y). */
  query(x: number, y: number, r: number, out: T[] = [], pad = 1.5): T[] {
    const cs = this.cellSize;
    const x0 = Math.floor((x - r - pad) / cs);
    const x1 = Math.floor((x + r + pad) / cs);
    const y0 = Math.floor((y - r - pad) / cs);
    const y1 = Math.floor((y + r + pad) / cs);
    for (let cy = y0; cy <= y1; cy++) {
      for (let cx = x0; cx <= x1; cx++) {
        const c = this.cells.get(this.key(cx, cy));
        if (!c) continue;
        for (const e of c) {
          const rr = r + e.radius;
          const dx = e.pos.x - x;
          const dy = e.pos.y - y;
          if (dx * dx + dy * dy <= rr * rr) out.push(e);
        }
      }
    }
    return out;
  }
}
