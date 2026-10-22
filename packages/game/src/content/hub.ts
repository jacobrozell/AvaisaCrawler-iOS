// The camp yard. Walk to a stall. There is no town server.

import { Tile, TileMap } from '../map/tilemap.js';
import { deriveStats } from '../rules/stats.js';
import type { Save } from '../save.js';
import { Player } from '../sim/entities.js';
import { Simulation } from '../sim/Simulation.js';

export const HUB_SPAWN = { x: 20.5, y: 14.5 };
export const HUB_REACH = 2.3;

export interface Station {
  id: 'shaft' | 'sell' | 'reforge' | 'stash' | 'rank' | 'loadout' | 'night';
  name: string;
  label: string;
  x: number;
  y: number;
  color: string;
}

export const STATIONS: readonly Station[] = [
  { id: 'shaft', name: 'The Shaft', label: 'Descend', x: 20.5, y: 3.6, color: '#c8343c' },
  { id: 'sell', name: 'Buyer', label: 'Sell', x: 6.5, y: 10.6, color: '#d9c06a' },
  { id: 'reforge', name: 'Forge', label: 'Reforge', x: 33.5, y: 10.6, color: '#c98b4a' },
  { id: 'loadout', name: 'Rack', label: 'Loadout', x: 14.5, y: 19.6, color: '#f3eadf' },
  { id: 'stash', name: 'Stash', label: 'Stash', x: 8.5, y: 19.6, color: '#7aa0b8' },
  { id: 'night', name: 'Cot', label: 'Night shift', x: 26.5, y: 19.6, color: '#8a6f6a' },
  { id: 'rank', name: 'Board', label: 'Rank', x: 32.5, y: 19.6, color: '#e9c49a' },
];

interface Rect { x: number; y: number; w: number; h: number }

export function buildHub(): TileMap {
  const map = new TileMap(40, 26);
  const fill = (r: Rect, t: number): void => {
    for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) map.set(x, y, t);
  };
  fill({ x: 2, y: 2, w: 36, h: 22 }, Tile.Floor);
  fill({ x: 18, y: 1, w: 5, h: 4 }, Tile.Road);
  fill({ x: 19, y: 2, w: 3, h: 22 }, Tile.Road);
  fill({ x: 2, y: 13, w: 36, h: 3 }, Tile.Road);
  fill({ x: 4, y: 7, w: 6, h: 3 }, Tile.Building);
  fill({ x: 30, y: 7, w: 6, h: 3 }, Tile.Building);
  fill({ x: 17, y: 17, w: 6, h: 3 }, Tile.Plank);
  for (const [x, y] of [[4, 4], [8, 5], [35, 4], [36, 16], [4, 22], [36, 22], [14, 8], [27, 8]] as const) map.set(x, y, Tile.Tree);
  return map;
}

/** Walkable camp. The stick moves the Warden. Stalls open when you stand next to them. */
export class Hub {
  readonly sim: Simulation;
  readonly player: Player;

  constructor(save: Save) {
    const map = buildHub();
    this.sim = new Simulation(map, 1, HUB_SPAWN, { monsterLevel: 1, lifeMult: 1, damageMult: 0 }, true);
    const stats = deriveStats(save.level, save.equipped, save.trophy);
    this.player = new Player(this.sim.allocId(), { ...HUB_SPAWN }, 'warden', save, stats, null);
    this.sim.addPlayer(this.player);
  }

  step(mx: number, my: number): void {
    this.player.input = { seq: this.sim.tick, mx, my, ax: 0, ay: 0, buttons: 0, lock: 0 };
    this.sim.step();
    this.sim.events.length = 0;
  }

  nearest(): Station | null {
    let best: Station | null = null;
    let bestD = HUB_REACH;
    for (const station of STATIONS) {
      const d = Math.hypot(station.x - this.player.pos.x, station.y - this.player.pos.y);
      if (d < bestD) {
        bestD = d;
        best = station;
      }
    }
    return best;
  }
}
