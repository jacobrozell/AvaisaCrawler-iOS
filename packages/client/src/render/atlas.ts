// Bakes palette rows into canvases and blits them crisp (nearest-neighbor).

import { raster } from './pixels.js';

const cache = new Map<string, HTMLCanvasElement>();
const silhouettes = new WeakMap<HTMLCanvasElement, HTMLCanvasElement>();
const inks = new WeakMap<HTMLCanvasElement, Map<number, HTMLCanvasElement>>();

export function bake(key: string, rows: string[], scale = 2, overrides?: Record<string, string>): HTMLCanvasElement {
  const full = overrides ? `${key}@${scale}@${JSON.stringify(overrides)}` : `${key}@${scale}`;
  const hit = cache.get(full);
  if (hit) return hit;
  const { w, h, rgba } = raster(rows, scale, overrides);
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  c.getContext('2d')!.putImageData(new ImageData(rgba as Uint8ClampedArray<ArrayBuffer>, w, h), 0, 0);
  cache.set(full, c);
  return c;
}

function silhouette(src: HTMLCanvasElement): HTMLCanvasElement {
  let c = silhouettes.get(src);
  if (c) return c;
  c = document.createElement('canvas');
  c.width = src.width;
  c.height = src.height;
  const g = c.getContext('2d')!;
  g.drawImage(src, 0, 0);
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = '#fff';
  g.fillRect(0, 0, c.width, c.height);
  silhouettes.set(src, c);
  return c;
}

export interface BlitOpts {
  flip?: boolean;
  alpha?: number;
  /** White hit-flash over the silhouette. */
  flash?: boolean;
  /** Additive white pulse (windup). */
  glow?: number;
  /** Pixels to raise the sprite (levitate). */
  lift?: number;
  anchor?: 'foot' | 'center';
  /** Dark rim, in baked pixels, so the sprite separates from the ground. */
  ink?: number;
}

function inkOf(src: HTMLCanvasElement, pad: number): HTMLCanvasElement {
  let bag = inks.get(src);
  const hit = bag?.get(pad);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = src.width + pad * 2;
  c.height = src.height + pad * 2;
  const g = c.getContext('2d')!;
  g.imageSmoothingEnabled = false;
  const sil = silhouette(src);
  for (let dy = -pad; dy <= pad; dy += pad) {
    for (let dx = -pad; dx <= pad; dx += pad) {
      if (dx === 0 && dy === 0) continue;
      g.drawImage(sil, pad + dx, pad + dy);
    }
  }
  g.globalCompositeOperation = 'source-in';
  g.fillStyle = '#140e0b';
  g.fillRect(0, 0, c.width, c.height);
  if (!bag) {
    bag = new Map();
    inks.set(src, bag);
  }
  bag.set(pad, c);
  return c;
}

/** Draw with the foot (or center) at (x, y). Negative lift moves the sprite up. */
export function blit(g: CanvasRenderingContext2D, sprite: HTMLCanvasElement, x: number, y: number, opts: BlitOpts = {}): void {
  const w = sprite.width;
  const h = sprite.height;
  const top = opts.anchor === 'center' ? Math.round(-h / 2) : -h;
  const pad = opts.ink ?? 0;
  g.save();
  g.imageSmoothingEnabled = false;
  g.translate(Math.round(x), Math.round(y - (opts.lift ?? 0)));
  if (opts.flip) g.scale(-1, 1);
  g.globalAlpha = opts.alpha ?? 1;
  if (pad > 0) g.drawImage(inkOf(sprite, pad), Math.round(-w / 2) - pad, top - pad);
  g.drawImage(sprite, Math.round(-w / 2), top);
  if (opts.flash) {
    g.globalAlpha = (opts.alpha ?? 1) * 0.88;
    g.drawImage(silhouette(sprite), Math.round(-w / 2), top);
  } else if (opts.glow) {
    g.globalCompositeOperation = 'lighter';
    g.globalAlpha = opts.glow * (opts.alpha ?? 1);
    g.drawImage(silhouette(sprite), Math.round(-w / 2), top);
  }
  g.restore();
}
