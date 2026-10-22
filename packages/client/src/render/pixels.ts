// Pixel palette and rasterizer shared by terrain, sprites, and the canvas atlas.
// '.' is empty. Every other character is a palette color (overridable per bake).

export const PAL: Record<string, string> = {
  o: '#1c140f',
  k: '#0c0908',
  s: '#f0c9a4',
  S: '#c9956c',
  h: '#3a2418',
  w: '#f7f3ea',
  e: '#1a120e',
  m: '#d7d2c8',
  M: '#6e6962',
  n: '#a9a49a',
  r: '#c4473c',
  R: '#6e2428',
  g: '#3f8f56',
  G: '#1d4630',
  u: '#4a5ec8',
  U: '#26284f',
  b: '#3ec0ff',
  B: '#145a86',
  d: '#8d5a30',
  D: '#4a3018',
  y: '#f0c14a',
  Y: '#8a6420',
  p: '#e4d2b0',
  l: '#ffe7a0',
  a: '#3c332b',
  A: '#241c17',
  c: '#5c4c3e',
  i: '#7d6a58',
  t: '#3d5c32',
  T: '#1e3418',
  f: '#6e9348',
  q: '#1a5a74',
  Q: '#4aa4c4',
  v: '#0d3344',
  j: '#6e4c30',
  J: '#3e2a1a',
  x: '#2a1c12',
  z: '#6a4030',
  Z: '#3a2218',
  P: '#d2c4ff',
  V: '#7d5fd0',
};

export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const ch = (c: number): number => Math.max(0, Math.min(255, c + amt));
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export function pxHash(x: number, y: number): number {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Trim a common leading indent. Art uses '.' for empty pixels, never spaces. */
export function px(src: string): string[] {
  const lines = src.replace(/^\n/, '').replace(/\n$/, '').split('\n');
  const ind = lines.reduce((m, l) => {
    if (!l.trim()) return m;
    return Math.min(m, l.match(/^[ ]*/)?.[0].length ?? 0);
  }, 99);
  const rows = lines.map((l) => l.slice(ind));
  const w = rows[0]?.length ?? 0;
  if (!w) throw new Error('empty sprite');
  const bad: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i]!;
    if (r.length !== w) bad.push(`row ${i} width ${r.length} != ${w} [${r}]`);
    for (const ch of r) if (ch !== '.' && !PAL[ch]) bad.push(`bad pixel '${ch}' at row ${i}`);
  }
  if (bad.length) throw new Error(bad.join('; '));
  return rows;
}

export interface Raster {
  w: number;
  h: number;
  rgba: Uint8ClampedArray;
}

export function raster(rows: string[], scale = 1, overrides?: Record<string, string>): Raster {
  const h = rows.length;
  const w = rows[0]?.length ?? 0;
  if (!w || rows.some((r) => r.length !== w)) throw new Error('ragged sprite');
  const rgba = new Uint8ClampedArray(w * scale * h * scale * 4);
  for (let y = 0; y < h; y++) {
    const row = rows[y]!;
    for (let x = 0; x < w; x++) {
      const ch = row[x]!;
      if (ch === '.') continue;
      const hex = overrides?.[ch] ?? PAL[ch];
      if (!hex) throw new Error(`unknown pixel '${ch}'`);
      const n = parseInt(hex.slice(1), 16);
      const cr = (n >> 16) & 255;
      const cg = (n >> 8) & 255;
      const cb = n & 255;
      for (let sy = 0; sy < scale; sy++) {
        for (let sx = 0; sx < scale; sx++) {
          const i = ((y * scale + sy) * (w * scale) + (x * scale + sx)) * 4;
          rgba[i] = cr;
          rgba[i + 1] = cg;
          rgba[i + 2] = cb;
          rgba[i + 3] = 255;
        }
      }
    }
  }
  return { w: w * scale, h: h * scale, rgba };
}
