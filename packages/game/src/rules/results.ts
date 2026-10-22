// The sheet between descents. At most three upgrades, with damage and toughness.
// A weapon that wins on damage is called out as replacing the Main.

import type { Item, Loadout } from './character.js';
import { compareItem } from './stats.js';

export interface UpgradeCard {
  item: Item;
  dps: number;
  toughness: number;
  slot: ReturnType<typeof compareItem>['slot'];
  replacesMain: boolean;
}

const BETTER = 0.005;

export function buildResults(level: number, equipped: Loadout, bag: readonly Item[], trophy: readonly Item[] = []): { upgrades: UpgradeCard[]; junk: Item[] } {
  const cards: UpgradeCard[] = [];
  for (const item of bag) {
    if (item.rarity === 'scrap') continue;
    const cmp = compareItem(level, equipped, item, trophy);
    if (cmp.dps <= BETTER && cmp.toughness <= BETTER) continue;
    cards.push({
      item,
      dps: cmp.dps,
      toughness: cmp.toughness,
      slot: cmp.slot,
      replacesMain: item.slot === 'weapon' && cmp.dps > BETTER,
    });
  }
  cards.sort((a, b) => b.dps + b.toughness - (a.dps + a.toughness));
  const picked: UpgradeCard[] = [];
  const main = cards.find((c) => c.replacesMain);
  if (main) picked.push(main);
  for (const card of cards) {
    if (picked.length >= 3) break;
    if (!picked.includes(card)) picked.push(card);
  }
  const shown = new Set(picked.map((c) => c.item.id));
  const junk = bag.filter((item) => !shown.has(item.id));
  return { upgrades: picked, junk };
}
