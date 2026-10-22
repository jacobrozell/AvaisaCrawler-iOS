// Camp, results, reforge, and rank. Landscape, thumb reach, 44px targets.

import {
  ACTS,
  AFFIXES,
  DEEP_VEIN_SECONDS,
  DEEP_VEIN_UNLOCK_LEVEL,
  PACK_CAP,
  PRESSURE_TIERS,
  RARITY_INFO,
  STASH_CAP,
  actFor,
  activeWindow,
  buildResults,
  packCount,
  reforgeCost,
  seasonPhase,
  sellValue,
  stashCount,
  xpToNext,
  type Item,
  type Save,
  type UpgradeCard,
} from '@echo/game';
import type { BoardRow } from './board.js';

export function mark(item: Item): string {
  const info = RARITY_INFO[item.rarity];
  return `<i class="mark ${info.shape}" style="--r:${info.color}" title="${info.name}"></i>`;
}

function affixLine(item: Item, index: number): string {
  const affix = item.affixes[index];
  if (!affix) return '';
  const def = AFFIXES[affix.id as keyof typeof AFFIXES];
  const label = def?.label ?? affix.id;
  const shown = def?.format === 'pct' ? `${Math.round(affix.value * 100)}%` : `${Math.round(affix.value)}`;
  return `${label} ${shown}`;
}

function itemBlock(item: Item): string {
  const act = item.actId ? ACTS[item.actId] : undefined;
  const bits = [
    item.retired ? 'Power off' : '',
    item.seasonId ? item.seasonId : '',
    item.leftover ? `+${item.leftover} Flesh` : '',
    act && !item.retired ? act.name : '',
    ...item.affixes.map((_, i) => affixLine(item, i)),
  ].filter(Boolean);
  return `<div class="card">${mark(item)}<div><h3>${escapeHtml(item.name)}</h3><p class="dim">${bits.join(' · ') || RARITY_INFO[item.rarity].name}</p></div></div>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

export function pct(n: number): string {
  const v = Math.round(n * 100);
  if (v > 0) return `+${v}%`;
  return `${v}%`;
}

export function applyHand(save: Save): void {
  document.body.classList.toggle('hand-left', save.handedness === 'left');
  document.body.classList.toggle('hand-right', save.handedness !== 'left');
}

export function renderDescend(
  root: HTMLElement,
  save: Save,
  note: string,
  onDescend: () => void,
  onVein: (depth: number) => void,
  onPressure: (id: number) => void,
  onBack: () => void,
): void {
  const veinLocked = save.level < DEEP_VEIN_UNLOCK_LEVEL;
  const nextDepth = (save.rankedBest?.depth ?? 0) + 1;
  const blocked = !!save.pendingBag?.length;
  root.innerHTML = `
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">The Shaft</p>
        <h2>Descend</h2>
        <p class="banner">${escapeHtml(note)}</p>
        <p class="dim">Level ${save.level}${save.level < 20 ? ` · ${save.xp}/${xpToNext(save.level)}` : ''} · pack ${packCount(save)}/${PACK_CAP} · stash ${stashCount(save)}/${STASH_CAP}</p>
        <div class="chips" id="pressure"></div>
        <div class="row">
          <button type="button" class="primary" id="descend" ${blocked ? 'disabled' : ''}>Descend</button>
          <button type="button" id="vein" ${veinLocked || blocked ? 'disabled' : ''}>${veinLocked ? `Deep Vein at ${DEEP_VEIN_UNLOCK_LEVEL}` : `Deep Vein ${nextDepth}`}</button>
          ${save.rankedBest && !veinLocked ? `<button type="button" id="again" ${blocked ? 'disabled' : ''}>Again at ${save.rankedBest.depth}</button>` : ''}
          <button type="button" id="back">Back</button>
        </div>
      </section>
    </div>`;
  const chips = root.querySelector('#pressure')!;
  for (const tier of PRESSURE_TIERS) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = tier.name;
    btn.disabled = save.level < tier.minLevel;
    btn.setAttribute('aria-pressed', tier.id === save.pressure ? 'true' : 'false');
    btn.addEventListener('click', () => onPressure(tier.id));
    chips.append(btn);
  }
  root.querySelector('#descend')!.addEventListener('click', onDescend);
  root.querySelector('#vein')?.addEventListener('click', () => {
    if (!veinLocked) onVein(nextDepth);
  });
  root.querySelector('#again')?.addEventListener('click', () => {
    if (save.rankedBest) onVein(save.rankedBest.depth);
  });
  root.querySelector('#back')!.addEventListener('click', onBack);
}

export function renderSell(root: HTMLElement, save: Save, onSell: (ids: string[]) => void, onBack: () => void): void {
  root.innerHTML = `
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">Buyer</p>
        <h2>Sell what you carry</h2>
        <p class="dim">${save.shards} shards. Worn gear stays on. The stash is not for sale until you take it out.</p>
        <div class="row">
          <button type="button" id="scrap">Sell scrap</button>
          <button type="button" id="back">Back</button>
        </div>
      </section>
      <section id="goods"></section>
    </div>`;
  const goods = root.querySelector('#goods')!;
  if (!save.inventory.length) goods.innerHTML = '<p class="dim">The pack is empty.</p>';
  for (const item of save.inventory) {
    const wrap = document.createElement('div');
    wrap.innerHTML = itemBlock(item);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = `Sell · ${sellValue(item)} shards`;
    btn.addEventListener('click', () => onSell([item.id]));
    wrap.querySelector('.card > div')?.append(btn);
    goods.append(wrap);
  }
  root.querySelector('#scrap')!.addEventListener('click', () => onSell(save.inventory.filter((item) => item.rarity === 'scrap').map((item) => item.id)));
  root.querySelector('#back')!.addEventListener('click', onBack);
}

export function renderStash(root: HTMLElement, save: Save, onStore: (id: string) => void, onWithdraw: (id: string) => void, onBack: () => void): void {
  root.innerHTML = `
    <div class="stack">
      <section>
        <p class="eyebrow">Chest</p>
        <h2>Pack ${packCount(save)}/${PACK_CAP}</h2>
        <p class="dim">What you carry into the shaft.</p>
        <div id="pack"></div>
      </section>
      <section>
        <h2>Stash ${stashCount(save)}/${STASH_CAP}</h2>
        <p class="dim">Stays in camp.</p>
        <div id="chest"></div>
        <button type="button" id="back">Back</button>
      </section>
    </div>`;
  const pack = root.querySelector('#pack')!;
  const chest = root.querySelector('#chest')!;
  if (!save.inventory.length) pack.innerHTML = '<p class="dim">The pack is empty.</p>';
  if (!save.stash.length) chest.innerHTML = '<p class="dim">The chest is empty.</p>';
  for (const item of save.inventory) pack.append(moveCard(item, 'To stash', () => onStore(item.id)));
  for (const item of save.stash) chest.append(moveCard(item, 'To pack', () => onWithdraw(item.id)));
  root.querySelector('#back')!.addEventListener('click', onBack);
}

function moveCard(item: Item, label: string, onClick: () => void): HTMLElement {
  const wrap = document.createElement('div');
  wrap.innerHTML = itemBlock(item);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = label;
  btn.addEventListener('click', onClick);
  wrap.querySelector('.card > div')?.append(btn);
  return wrap;
}

export interface SheetHooks {
  save: Save;
  title: string;
  detail: string;
  onEquip: (id: string) => void;
  onPack: (id: string) => void;
  onStash: (id: string) => void;
  onSalvage: (id: string) => void;
  onSalvageJunk: () => void;
  onDone: () => void;
}

export function renderSheet(root: HTMLElement, h: SheetHooks): void {
  const bag = h.save.pendingBag ?? [];
  const { upgrades, junk } = buildResults(h.save.level, h.save.equipped, bag, h.save.trophy);
  root.innerHTML = `
    <div class="sheet">
      <section class="identity">
        <p class="eyebrow">Results</p>
        <h2>${escapeHtml(h.title)}</h2>
        <p>${escapeHtml(h.detail)}</p>
        <p class="dim">Shards and scrap are already in the pouch. Graded and better are here. Pack ${packCount(h.save)}/${PACK_CAP}. Stash ${stashCount(h.save)}/${STASH_CAP}.</p>
        <div class="row">
          ${junk.length ? `<button type="button" id="junk">Salvage junk (${junk.length})</button>` : ''}
          ${bag.length === 0 ? `<button type="button" class="primary" id="done">Back to camp</button>` : ''}
        </div>
      </section>
      <section id="cards"></section>
    </div>`;
  const cards = root.querySelector('#cards')!;
  if (!upgrades.length && bag.length) cards.insertAdjacentHTML('beforeend', '<p class="dim">Nothing here beats what you have on.</p>');
  for (const card of upgrades) cards.insertAdjacentHTML('beforeend', upgradeHtml(card));
  cards.querySelectorAll('button[data-act]').forEach((node) => {
    node.addEventListener('click', () => {
      const el = node as HTMLButtonElement;
      const id = el.dataset.id!;
      if (el.dataset.act === 'equip') h.onEquip(id);
      if (el.dataset.act === 'pack') h.onPack(id);
      if (el.dataset.act === 'stash') h.onStash(id);
      if (el.dataset.act === 'salvage') h.onSalvage(id);
    });
  });
  root.querySelector('#junk')?.addEventListener('click', h.onSalvageJunk);
  root.querySelector('#done')?.addEventListener('click', h.onDone);
}

function upgradeHtml(card: UpgradeCard): string {
  const id = escapeHtml(card.item.id);
  const main = card.replacesMain ? '<p>This replaces the Main.</p>' : '';
  return `<div class="card">${mark(card.item)}<div>
    <h3>${escapeHtml(card.item.name)}</h3>
    ${main}
    <p class="dim">Damage ${pct(card.dps)} · Toughness ${pct(card.toughness)}</p>
    <div class="row">
      <button type="button" data-act="equip" data-id="${id}">Equip</button>
      <button type="button" data-act="pack" data-id="${id}">Pack</button>
      <button type="button" data-act="stash" data-id="${id}">Stash</button>
      <button type="button" data-act="salvage" data-id="${id}">Salvage</button>
    </div>
  </div></div>`;
}

export function renderGear(root: HTMLElement, save: Save, now: number, onEquip: (id: string) => void, onReclaim: () => void, onBack: () => void): void {
  const phase = seasonPhase(activeWindow(save, now), now);
  const slots: Array<[string, Item | undefined]> = [
    ['Weapon', save.equipped.weapon],
    ['Plate', save.equipped.plate],
    ['Artifact', save.equipped.artifact0],
    ['Artifact', save.equipped.artifact1],
    ['Artifact', save.equipped.artifact2],
    ['Charm', save.equipped.charm],
  ];
  root.innerHTML = `
    <div class="stack">
      <section>
        <p class="eyebrow">Loadout</p>
        <h2>What you are wearing</h2>
        ${slots.map(([label, item]) => item ? itemBlock(item) : `<div class="card"><i class="mark square"></i><div><h3>${label}</h3><p class="dim">Empty</p></div></div>`).join('')}
        <button type="button" id="back">Back</button>
      </section>
      <section>
        <h2>Pack ${packCount(save)}/${PACK_CAP}</h2>
        <p class="dim">Stash ${stashCount(save)}/${STASH_CAP} is the chest in camp.</p>
        <div id="pack"></div>
        ${save.trophy.length ? `<h2>Trophy case</h2><p class="dim">Power off. A little Flesh remains.</p>${save.trophy.map(itemBlock).join('')}` : ''}
        ${save.setAside.length ? `<h2>Set aside</h2>${phase === 'ended' ? '<button type="button" id="reclaim">Take core gear back</button>' : '<p class="dim">View only until the season ends.</p>'}${save.setAside.map(itemBlock).join('')}` : ''}
      </section>
    </div>`;
  const pack = root.querySelector('#pack')!;
  if (!save.inventory.length) pack.innerHTML = '<p class="dim">The pack is empty.</p>';
  for (const item of save.inventory) {
    const wrap = document.createElement('div');
    wrap.innerHTML = itemBlock(item);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Equip';
    btn.addEventListener('click', () => onEquip(item.id));
    wrap.querySelector('.card > div')?.append(btn);
    pack.append(wrap);
  }
  root.querySelector('#back')!.addEventListener('click', onBack);
  root.querySelector('#reclaim')?.addEventListener('click', onReclaim);
}

export function renderReforge(root: HTMLElement, save: Save, onReplace: (id: string, index: number) => void, onBack: () => void, err: string): void {
  const items = [save.equipped.weapon, save.equipped.plate, save.equipped.artifact0, save.equipped.artifact1, save.equipped.artifact2, save.equipped.charm, ...save.inventory, ...save.stash].filter((i): i is Item => !!i && i.affixes.length > 0);
  root.innerHTML = `
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">Reforge</p>
        <h2>Replace one enchantment</h2>
        <p class="dim">A unique stays what it is. Reforge cannot add one.</p>
        <p class="err">${escapeHtml(err)}</p>
        <p class="dim">${save.shards} shards · ${save.dust} dust</p>
        <button type="button" id="back">Back</button>
      </section>
      <section id="forge"></section>
    </div>`;
  const forge = root.querySelector('#forge')!;
  if (!items.length) forge.innerHTML = '<p class="dim">Nothing here has an enchantment.</p>';
  for (const item of items) {
    const cost = reforgeCost(item.ilvl);
    const block = document.createElement('div');
    block.innerHTML = itemBlock(item);
    item.affixes.forEach((_, index) => {
      if (item.enchanted !== undefined && item.enchanted !== index) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = `Replace · ${cost.shards} shards, ${cost.dust} dust`;
      btn.addEventListener('click', () => onReplace(item.id, index));
      block.querySelector('.card > div')?.append(btn);
    });
    forge.append(block);
  }
  root.querySelector('#back')!.addEventListener('click', onBack);
}

export interface RankHooks {
  save: Save;
  rows: BoardRow[] | null;
  signedIn: boolean;
  canSignIn: boolean;
  err: string;
  onName: (name: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function renderRank(root: HTMLElement, h: RankHooks): void {
  const pending = h.save.pendingReplay;
  const later = pending ? 'This result will post when the board can be reached.' : '';
  root.innerHTML = `
    <div class="stack">
      <section class="identity">
        <p class="eyebrow">Rank</p>
        <h2>${escapeHtml(h.save.seasonId)}</h2>
        <p>One ladder. Deepest clear, then fastest time. The Apple name stays off the board.</p>
        <p class="banner">${escapeHtml(later)}</p>
        <p class="err">${escapeHtml(h.err)}</p>
        <form id="name-form" class="row">
          <input id="name" type="text" maxlength="16" placeholder="Board name" value="${escapeHtml(h.save.boardName)}" />
          <button type="submit">Save name</button>
        </form>
        <div class="row">
          ${h.canSignIn && !h.signedIn ? '<button type="button" id="signin">Sign in with Apple</button>' : ''}
          ${h.signedIn ? '<button type="button" id="signout">Sign out</button><button type="button" id="delete">Delete account</button>' : ''}
          ${!h.canSignIn ? '<p class="dim">Sign in with Apple from the Echo Shafts app to post a score.</p>' : ''}
          <button type="button" id="back">Back</button>
        </div>
      </section>
      <section id="board"></section>
    </div>`;
  const board = root.querySelector('#board')!;
  if (!h.rows) board.innerHTML = '<p class="dim">The board is not here. Camp and the shaft still run.</p>';
  else if (!h.rows.length) board.innerHTML = '<p class="dim">No clears posted yet.</p>';
  else {
    board.innerHTML = h.rows.map((row, i) => {
      const seconds = Math.round(row.ticks / 20);
      return `<div class="card"><div></div><div><h3>${i + 1}. ${escapeHtml(row.name)}</h3><p class="dim">Depth ${row.depth} · ${seconds}s</p></div></div>`;
    }).join('');
  }
  root.querySelector('#name-form')!.addEventListener('submit', (e) => {
    e.preventDefault();
    h.onName((root.querySelector('#name') as HTMLInputElement).value);
  });
  root.querySelector('#signin')?.addEventListener('click', h.onSignIn);
  root.querySelector('#signout')?.addEventListener('click', h.onSignOut);
  root.querySelector('#delete')?.addEventListener('click', h.onDelete);
  root.querySelector('#back')!.addEventListener('click', h.onBack);
}

export function buttonLabels(save: Save): void {
  const set = (id: string, item: Item | undefined) => {
    const btn = document.getElementById(id) as HTMLButtonElement | null;
    if (!btn) return;
    const act = actFor(item);
    btn.textContent = act ? act.name : '—';
    btn.disabled = !act;
  };
  set('btn-a0', save.equipped.artifact0);
  set('btn-a1', save.equipped.artifact1);
  set('btn-a2', save.equipped.artifact2);
}

export function hud(runEcho: number, runNeed: number, hp: number, maxHp: number, vessel: string, ranked: boolean, time: number): void {
  const life = document.getElementById('life-fill') as HTMLElement;
  const echo = document.getElementById('echo-fill') as HTMLElement;
  const status = document.getElementById('status') as HTMLElement;
  life.style.width = `${Math.max(0, Math.min(1, hp / maxHp)) * 100}%`;
  echo.style.width = `${Math.max(0, Math.min(1, runEcho / Math.max(1, runNeed))) * 100}%`;
  const vein = ranked ? `${Math.max(0, Math.ceil(DEEP_VEIN_SECONDS - time))}s` : '';
  const label = vessel === 'spawned' ? 'Vessel' : vessel === 'slain' ? 'Slain' : 'Echo';
  status.textContent = [label, vein].filter(Boolean).join(' · ');
}
