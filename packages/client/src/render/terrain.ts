// World-aligned pixel terrain. Patterns are keyed off world pixels so cobbles,
// shingles, and dirt clumps continue across tile boundaries. Each tile is 18
// source pixels, scaled 2× to the renderer's 36px tile.

import { Tile } from '@echo/game';
import { pxHash, raster, shade, type Raster } from './pixels.js';

const N = 18;

export interface TerrainOpts {
  tile: number;
  x: number;
  y: number;
  town: boolean;
  roof: string;
  front: boolean;
  door: boolean;
  window: boolean;
  leftEdge: boolean;
  rightEdge: boolean;
  faceSouth: boolean;
  lipNorth: boolean;
  shadowNorth: boolean;
  eave: boolean;
  brace: 'left' | 'right' | null;
  chimney: boolean;
}

const CRACKS: readonly (readonly [number, number])[][] = [
  [
    [3, 7],
    [4, 8],
    [5, 9],
    [6, 10],
    [7, 11],
    [8, 11],
  ],
  [
    [12, 4],
    [12, 5],
    [11, 6],
    [11, 7],
    [10, 8],
    [10, 9],
    [9, 10],
  ],
  [
    [6, 13],
    [7, 13],
    [8, 14],
    [9, 14],
    [10, 15],
    [11, 15],
  ],
];

export function terrainRows(o: TerrainOpts): string[] {
  const rows: string[] = [];
  for (let y = 0; y < N; y++) {
    let row = '';
    for (let x = 0; x < N; x++) row += pixel(o, x, y, o.x * N + x, o.y * N + y);
    rows.push(row);
  }
  return rows;
}

const MINE_FLOOR = { a: '#7a624c', A: '#5a4334', c: '#96765c', i: '#d2b898', k: '#3a2c22' };
const MINE_WALL = { a: '#2e261f', c: '#3e342c', A: '#1a1512', o: '#14110e' };

export function terrainRaster(o: TerrainOpts, scale = 3): Raster {
  const pal: Record<string, string> = {};
  if (o.tile === Tile.Building && !o.front) {
    pal.z = o.roof;
    pal.Z = shade(o.roof, -42);
    pal.c = shade(o.roof, 48);
    pal.o = shade(o.roof, -62);
  }
  if (!o.town && o.tile === Tile.Floor) Object.assign(pal, MINE_FLOOR);
  if (!o.town && (o.tile === Tile.Rock || o.tile === Tile.Crystal)) Object.assign(pal, MINE_WALL);
  return raster(terrainRows(o), scale, Object.keys(pal).length ? pal : undefined);
}

function pixel(o: TerrainOpts, x: number, y: number, gx: number, gy: number): string {
  const t = o.tile;
  if (t === Tile.Building) return o.front ? wall(o, x, y, gx, gy) : roof(o, x, y, gx, gy);
  if (t === Tile.Rock || t === Tile.Crystal) return rock(o, x, y, gx, gy);
  if (t === Tile.Water) return water(gx, gy);
  if (t === Tile.Plank) return plank(x, y, gx, gy, o.shadowNorth);
  if (t === Tile.Road) return road(gx, gy, o.shadowNorth);
  if (t === Tile.Tree || (t === Tile.Floor && o.town)) return grass(o, x, y, gx, gy);
  if (t === Tile.Floor) return dirt(o, x, y, gx, gy);
  return 'k';
}

function grass(o: TerrainOpts, x: number, y: number, gx: number, gy: number): string {
  if (o.shadowNorth && y < 2) return 'T';
  const clump = pxHash(Math.floor(gx / 3), Math.floor(gy / 3));
  if (pxHash(gx, gy) > 0.997) return pxHash(gx + 3, gy) > 0.5 ? 'y' : 'r';
  if (clump > 0.9) return 'f';
  if (clump > 0.8) return 'T';
  return 't';
}

function dirt(o: TerrainOpts, x: number, y: number, gx: number, gy: number): string {
  const post = o.brace === 'left' && x <= 3 && y >= 3 ? bracePixel(x, y, true) : o.brace === 'right' && x >= 14 && y >= 3 ? bracePixel(x, y, false) : null;
  if (post) return post;
  if (o.shadowNorth && y < 2) return 'A';
  const crack = pxHash(o.x, o.y);
  if (crack > 0.78) {
    const pat = CRACKS[Math.floor(pxHash(o.x + 5, o.y) * CRACKS.length)]!;
    if (pat.some(([cx, cy]) => cx === x && cy === y)) return 'k';
  }
  if (pxHash(o.x * 9, o.y * 3) > 0.992 && Math.abs(x - 8) + Math.abs(y - 12) < 3) return 'r';
  const clump = pxHash(Math.floor(gx / 3), Math.floor(gy / 3));
  if (pxHash(gx, gy) > 0.993) return 'i';
  if (clump > 0.86) return 'c';
  if (clump > 0.74) return 'A';
  return 'a';
}

function bracePixel(x: number, y: number, left: boolean): string | null {
  const col = left ? x : x - 14;
  if (y >= 16 && col <= 3) return 'D';
  if (col === 1 || col === 2) return y % 5 === 0 ? 'D' : 'd';
  return null;
}

function road(gx: number, gy: number, shadow: boolean): string {
  if (shadow && gy % N < 2) return 'A';
  const mortar = gx % 5 === 0 || gy % 5 === 0;
  if (mortar) return 'A';
  const alt = pxHash(Math.floor(gx / 5), Math.floor(gy / 5));
  if (alt > 0.72) return 'n';
  if (alt > 0.38) return 'i';
  return 'M';
}

function plank(x: number, y: number, gx: number, gy: number, shadow: boolean): string {
  if (shadow && y < 2) return 'J';
  if (gy % 3 === 0) return 'x';
  const board = Math.floor(gy / 3);
  if (gx % 9 === 4 && gy % 3 === 1) return 'M';
  if (pxHash(gx, board) > 0.9) return 'J';
  return board % 2 === 0 ? 'j' : 'd';
}

function water(gx: number, gy: number): string {
  if (pxHash(Math.floor(gx / 2), Math.floor(gy / 2)) > 0.93) return 'w';
  if ((gx + gy * 2) % 9 === 0 && gy % 3 === 1) return 'Q';
  if (Math.floor(gy / 3) % 2 === 0 && gy % 3 === 2) return 'v';
  return 'q';
}

function roof(o: TerrainOpts, x: number, y: number, gx: number, gy: number): string {
  if (o.chimney && x >= 6 && x <= 11 && y >= 1 && y <= 11) {
    if (x >= 8 && x <= 9 && y >= 2 && y <= 4) return 'k';
    if (x === 6 || x === 11 || y === 11) return 'M';
    return (x + y) % 2 === 0 ? 'n' : 'M';
  }
  if (o.eave && y >= 16) return y === 17 ? 'o' : 'Z';
  const course = Math.floor(gy / 4);
  const lx = (gx + (course % 2) * 3) % 6;
  if (lx === 0 || gy % 4 === 3) return lx === 0 ? 'o' : 'Z';
  if (gy % 4 === 1 && lx === 1) return 'c';
  return 'z';
}

function wall(o: TerrainOpts, x: number, y: number, gx: number, gy: number): string {
  const frame = (o.leftEdge && x < 2) || (o.rightEdge && x > 15) || y < 2 || y > 15;
  if (o.door && x >= 5 && x <= 12 && y >= 5) {
    if (x === 5 || x === 12 || y === 5) return 'D';
    if (x === 10 && y >= 11 && y <= 13) return 'y';
    return 'k';
  }
  if (o.window && x >= 5 && x <= 12 && y >= 4 && y <= 11) {
    if (x === 5 || x === 12 || y === 4 || y === 11) return 'd';
    if ((x + y) % 4 === 0) return 'l';
    if ((x + y) % 5 === 0) return 'y';
    return 'U';
  }
  if (frame) return (x + y) % 4 === 0 ? 'D' : 'd';
  const clump = pxHash(Math.floor(gx / 4), Math.floor(gy / 4));
  if (clump > 0.86) return 'c';
  return 'p';
}

function rock(o: TerrainOpts, x: number, y: number, gx: number, gy: number): string {
  let ch: string;
  if (o.faceSouth) {
    if (y < 6) {
      const clump = pxHash(Math.floor(gx / 3), Math.floor(gy / 3));
      ch = y === 5 ? 'i' : clump > 0.75 ? 'c' : clump > 0.5 ? 'A' : 'k';
    } else if (y === 6) ch = 'n';
    else {
      const clump = pxHash(Math.floor(gx / 2), y);
      if (y === 10 || y === 14) ch = 'A';
      else if (clump > 0.86) ch = 'k';
      else if (clump > 0.7) ch = 'i';
      else ch = y < 11 ? 'c' : 'a';
    }
  } else {
    const clump = pxHash(Math.floor(gx / 3), Math.floor(gy / 3));
    ch = o.lipNorth && y < 3 ? (y === 2 ? 'i' : 'A') : clump > 0.9 ? 'k' : clump > 0.5 ? 'A' : 'o';
  }
  if (o.tile === Tile.Crystal) ch = crystal(o, x, y, ch);
  return ch;
}

function crystal(o: TerrainOpts, x: number, y: number, base: string): string {
  const n = o.faceSouth ? 3 : 2;
  for (let i = 0; i < n; i++) {
    if (pxHash(o.x * 3 + i * 11, o.y + i) < (o.faceSouth ? 0.25 : 0.55)) continue;
    const cx = 3 + Math.floor(pxHash(o.x + i * 5, o.y + 2) * 12);
    const baseY = o.faceSouth ? 15 : 14;
    const ht = (o.faceSouth ? 6 : 4) + Math.floor(pxHash(o.x + i, o.y + 4) * (o.faceSouth ? 5 : 3));
    const dy = baseY - y;
    if (dy < 0 || dy > ht) continue;
    const half = Math.max(0, Math.round((1 - dy / ht) * (o.faceSouth ? 2.4 : 1.6)));
    if (Math.abs(x - cx) <= half) {
      if (dy >= ht - 1) return 'w';
      return (x + i) % 2 === 0 ? 'b' : 'B';
    }
  }
  return base;
}
