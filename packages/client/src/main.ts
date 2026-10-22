// Camp loop. The shaft steps the TypeScript sim on the phone. No live game server.

import {
  Hub,
  NIGHT_CAP_MS,
  Rng,
  ShaftRun,
  activeWindow,
  beatsBest,
  buildResults,
  claimNight,
  ensureLessonSeal,
  equipItem,
  keepItem,
  loadSave,
  markAway,
  newSave,
  noteNight,
  reclaimSetAside,
  salvageInto,
  sellItems,
  setBoardName,
  STASH_CAP,
  storeItem,
  syncSeason,
  tryReforge,
  withdrawItem,
  type Save,
  type Station,
} from '@echo/game';
import {
  bootFirebase,
  currentUser,
  deleteAccount,
  fetchBoard,
  fetchSeason,
  firebaseReady,
  onSignedIn,
  pushBoardName,
  signOutBoard,
  submitReplay,
} from './board.js';
import { setScene, sfx, unlockAudio } from './render/audio.js';
import { noteHit, paint, paintHub, screenToWorld, type Flash } from './draw.js';
import { askAppleSignIn, cancelNight, haptic, requestNotifyPermission, scheduleNight } from './native.js';
import { applyHand, buttonLabels, hud, renderDescend, renderGear, renderRank, renderReforge, renderSell, renderSheet, renderStash } from './ui.js';

const KEY = 'echo-shafts-warden';
const HINTS = [
  'The stick sets facing. Hold Main. Echo fills when the swing lands, and a whiff fills nothing.',
  'One artifact button is on the right. After the shaft, the results sheet is the loot.',
  'This is the last practice shaft. After it, Surface is the real mine. A Deep Vein is five minutes, ranked, and unlocks at level 10.',
];

const panel = document.getElementById('panel')!;
const shaft = document.getElementById('shaft')!;
const canvas = document.getElementById('view') as HTMLCanvasElement;
const hint = document.getElementById('hint')!;

let save = readSave();
let note = '';
let run: ShaftRun | null = null;
let hub: Hub | null = null;
let onCamp = true;
let paused = false;
let flash: Flash | null = null;
let sheet: { title: string; detail: string } | null = null;
const input = { mx: 0, my: 0, b: 0, lock: 0 };

applyHand(save);
if (save.seasonWindow) note = syncSeason(save, save.seasonWindow, Date.now()).join(' ');
bootFirebase();
void refreshSeason();
if (save.pendingBag?.length) openSheet('Results', 'Graded and better are still waiting.');
else showCamp();
void flushReplay();
requestNotifyPermission();

window.__echoBackground = () => {
  markAway(save, Date.now());
  if (!save.unclaimedNight) scheduleNight(NIGHT_CAP_MS);
  if (run?.opts.ranked && !run.outcome) run.abandon();
  else paused = true;
  persist();
};
window.__echoForeground = () => {
  paused = false;
  noteNight(save, Date.now());
  persist();
  if (!run && onCamp) {
    if (save.unclaimedNight) note = 'Night shift is ready.';
    showCamp();
  }
  void flushReplay();
};

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') window.__echoBackground?.();
  else window.__echoForeground?.();
});

hint.addEventListener('click', () => {
  hint.hidden = true;
});
document.getElementById('leave')!.addEventListener('click', () => run?.abandon());
document.getElementById('hands')!.addEventListener('click', () => {
  save.handedness = save.handedness === 'left' ? 'right' : 'left';
  applyHand(save);
  persist();
  (document.getElementById('hands') as HTMLButtonElement).textContent = save.handedness === 'left' ? 'Right hand' : 'Left hand';
});
document.getElementById('interact')!.addEventListener('click', () => useStation());

wireStick();
wireButtons();
canvas.addEventListener('pointerdown', (e) => {
  if (!run) return;
  const world = screenToWorld(canvas, e.clientX, e.clientY, run.player.pos.x, run.player.pos.y);
  let best = 0;
  let bestD = 1.8;
  for (const m of run.sim.monsters.values()) {
    if (m.dead || m.faction === 'players') continue;
    const d = Math.hypot(m.pos.x - world.x, m.pos.y - world.y);
    if (d < bestD) {
      bestD = d;
      best = m.id;
    }
  }
  if (best) input.lock = best;
});

if (firebaseReady()) onSignedIn(() => void flushReplay());

addEventListener('pointerdown', (ev) => {
  unlockAudio();
  const el = ev.target;
  if (!(el instanceof Element)) return;
  const button = el.closest('button');
  if (button && !button.dataset.bit) sfx('ui');
});

let last = performance.now();
let acc = 0;
function frame(now: number): void {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  if (run && !paused && !run.outcome) {
    acc += dt;
    let steps = 0;
    while (acc >= 0.05 && steps < 4) {
      acc -= 0.05;
      steps++;
      run.step(input);
      const events = run.sim.events.splice(0);
      let dealt = false;
      let swung = false;
      for (const e of events) {
        if (e.t === 'cast' && e.id === run.player.id && e.v === 'main') {
          swung = true;
          haptic();
          flash = { facing: run.player.facing, until: now + 160, kind: 'swing' };
        } else if (e.t === 'dmg' && e.s === run.player.id) {
          dealt = true;
          haptic();
          noteHit(e.id, now);
          sfx('hit');
        } else if (e.t === 'dmg' && e.id === run.player.id && e.a > 0) {
          noteHit(e.id, now);
          sfx('hurt');
        } else if (e.t === 'die' && e.id === run.player.id) sfx('die');
        else if (e.t === 'lvl') sfx('level');
        else if (e.t === 'fx' && e.v === 'vessel_rise') {
          haptic();
          sfx('vessel');
        } else if (e.t === 'fx' && e.v === 'shards') sfx('shard');
        else if (e.t === 'fx' && e.v === 'globe') sfx('globe');
      }
      if (swung) sfx(dealt ? 'swing' : 'whiff');
      if (flash && flash.until > now - 20 && !dealt && events.some((e) => e.t === 'cast' && e.v === 'main')) flash.kind = 'whiff';
      input.lock = run.player.lockId;
    }
    hud(run.echo, run.echoRequired, run.player.hp, run.player.maxHp, run.vessel, run.opts.ranked, run.sim.time);
    paint(canvas, run, flash, now);
    setScene('shaft');
  } else if (hub && onCamp && !shaft.hidden && !paused) {
    acc += dt;
    let steps = 0;
    while (acc >= 0.05 && steps < 4) {
      acc -= 0.05;
      steps++;
      hub.step(input.mx, input.my);
    }
    paintHub(canvas, hub, now);
    setScene('camp');
    const station = hub.nearest();
    const interact = document.getElementById('interact') as HTMLButtonElement;
    const label = station ? stationPrompt(station) : '';
    interact.hidden = !label;
    interact.textContent = label;
    document.getElementById('status')!.textContent = `Lv ${save.level} · ${save.shards} shards · ${save.dust} dust`;
  } else if (hub && onCamp && !shaft.hidden) {
    paintHub(canvas, hub, now);
    setScene('camp');
  } else if (!run || paused || run.outcome) setScene('off');
  if (run?.outcome) {
    const done = run;
    run = null;
    if (done.outcome === 'abandoned') {
      persist();
      showCamp(done.opts.ranked ? 'The vein closed. That run is not on the board.' : 'You left the shaft.');
    } else void settle(done);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function readSave(): Save {
  try {
    const save = loadSave(JSON.parse(localStorage.getItem(KEY) || 'null'));
    // A company kit that already burned the lessons on the geared shaft goes back
    // through the practice mine. Swapping the pick-hammer ends that.
    if (save.tutorial >= 3 && save.level < 4 && save.equipped.weapon?.id === 'starter-weapon') save.tutorial = 0;
    return save;
  } catch {
    return newSave();
  }
}

function persist(): void {
  localStorage.setItem(KEY, JSON.stringify(save));
}

function showCamp(extra?: string): void {
  if (extra) note = extra;
  sheet = null;
  onCamp = true;
  if (!hub) hub = new Hub(save);
  panel.hidden = true;
  shaft.hidden = false;
  shaft.classList.add('hub');
  const hands = document.getElementById('hands') as HTMLButtonElement;
  hands.hidden = false;
  hands.textContent = save.handedness === 'left' ? 'Right hand' : 'Left hand';
  hint.hidden = !note;
  hint.textContent = note;
}

function enterUi(): void {
  onCamp = false;
  panel.hidden = false;
  shaft.hidden = true;
}

function stationPrompt(station: Station): string {
  if (station.id === 'night') return save.unclaimedNight ? 'Claim night shift' : '';
  if (station.id === 'shaft' && save.pendingBag?.length) return 'Results';
  if (station.id === 'shaft' && save.tutorial < 3) return 'Enter';
  return station.label;
}

function useStation(): void {
  const station = hub?.nearest();
  if (!station) return;
  if (station.id === 'shaft') {
    if (save.pendingBag?.length) openSheet('Results', 'Graded and better are still waiting.');
    else if (save.tutorial < 3) begin(false, 0);
    else showDescend();
  } else if (station.id === 'sell') showSell();
  else if (station.id === 'reforge') showReforge('');
  else if (station.id === 'stash') showStash();
  else if (station.id === 'rank') void showRank('');
  else if (station.id === 'loadout') showGear();
  else if (station.id === 'night') claim();
}

function showDescend(): void {
  enterUi();
  renderDescend(panel, save, save.pendingBag?.length ? 'Resolve the results sheet before the next descend.' : note, () => begin(false, 0), (depth) => begin(true, depth), (id) => {
    save.pressure = id;
    persist();
    showDescend();
  }, () => showCamp());
}

function showSell(): void {
  enterUi();
  renderSell(panel, save, (ids) => {
    if (ids.length) sellItems(save, ids);
    persist();
    showSell();
  }, () => showCamp());
}

function showStash(): void {
  enterUi();
  renderStash(panel, save, (id) => {
    storeItem(save, id);
    persist();
    showStash();
  }, (id) => {
    withdrawItem(save, id);
    persist();
    showStash();
  }, () => showCamp());
}

function begin(ranked: boolean, depth: number): void {
  if (save.pendingBag?.length) {
    showCamp('Resolve the results sheet before the next descend.');
    return;
  }
  const tutorial = !ranked && save.tutorial < 3;
  if (tutorial && save.tutorial === 1) ensureLessonSeal(save);
  const season = activeWindow(save, Date.now());
  const seed = crypto.getRandomValues(new Uint32Array(1))[0]! || 1;
  run = new ShaftRun(save, {
    kind: ranked ? 'deep' : tutorial ? 'tutorial' : 'echo',
    seed,
    pressure: save.pressure,
    depth: ranked ? depth : 0,
    ranked,
    mutator: season.mutator,
    seasonId: season.id,
  });
  onCamp = false;
  shaft.classList.remove('hub');
  paused = false;
  acc = 0;
  input.mx = 0;
  input.my = 0;
  input.b = 0;
  input.lock = 0;
  panel.hidden = true;
  shaft.hidden = false;
  buttonLabels(save);
  hint.hidden = !tutorial;
  hint.textContent = tutorial ? HINTS[save.tutorial]! : '';
}

async function settle(done: ShaftRun): Promise<void> {
  if (!done.opts.ranked && save.tutorial < 3) save.tutorial = (save.tutorial + 1) as Save['tutorial'];
  const shards = save.shards - done.snap.shards;
  const dust = save.dust - done.snap.dust;
  save.pendingBag = done.found.length ? done.found.slice() : null;
  const title = done.outcome === 'clear' ? 'The Vessel is down.' : done.outcome === 'timeout' ? 'The vein closed.' : 'The shaft ended.';
  let detail = `Shards ${Math.max(0, shards)}. Dust ${Math.max(0, dust)}. What you already picked up is here.`;
  if (done.opts.ranked && done.outcome !== 'clear') detail += ' This run is not on the board.';
  const replay = done.toReplay();
  if (replay && beatsBest(replay, save.rankedBest)) {
    const prev = save.rankedBest;
    save.rankedBest = { depth: replay.depth, ticks: replay.ticks };
    save.pendingReplay = replay;
    if (!save.boardName) detail += ' Choose a board name in Rank. This result will post later.';
    else {
      const res = await submitReplay(replay, save.boardName);
      if (res.ok) {
        save.pendingReplay = null;
        detail += ' It is on the board.';
      } else if (res.reason === 'later' || res.reason === 'offline' || res.reason === 'unsigned') {
        detail += ' This result will post later.';
      } else {
        save.rankedBest = prev;
        save.pendingReplay = null;
        detail += ` The board rejected it (${res.reason}).`;
      }
    }
  }
  persist();
  openSheet(title, detail);
}

function openSheet(title: string, detail: string): void {
  sheet = { title, detail };
  onCamp = false;
  panel.hidden = false;
  shaft.hidden = true;
  renderSheet(panel, {
    save,
    title,
    detail,
    onEquip: (id) => {
      const item = take(id);
      if (!item) return;
      const prev = equipItem(save, item);
      if (prev) save.pendingBag = [...(save.pendingBag ?? []), prev];
      persist();
      openSheet(title, detail);
    },
    onPack: (id) => {
      const item = (save.pendingBag ?? []).find((i) => i.id === id);
      if (!item) return;
      if (!keepItem(save, item)) {
        openSheet(title, 'The pack holds 20. Stash it, or salvage something.');
        return;
      }
      drop(id);
      persist();
      openSheet(title, detail);
    },
    onStash: (id) => {
      const item = take(id);
      if (!item) return;
      if (!save.stash) save.stash = [];
      if (save.stash.length >= STASH_CAP) {
        save.pendingBag = [...(save.pendingBag ?? []), item];
        openSheet(title, 'The chest is full.');
        return;
      }
      save.stash.push(item);
      persist();
      openSheet(title, detail);
    },
    onSalvage: (id) => {
      const item = take(id);
      if (!item) return;
      salvageInto(save, item);
      persist();
      openSheet(title, detail);
    },
    onSalvageJunk: () => {
      const bag = save.pendingBag ?? [];
      for (const item of buildResults(save.level, save.equipped, bag, save.trophy).junk) {
        salvageInto(save, item);
        drop(item.id);
      }
      persist();
      openSheet(title, detail);
    },
    onDone: () => {
      save.pendingBag = null;
      persist();
      showCamp();
    },
  });
}

function take(id: string) {
  const item = (save.pendingBag ?? []).find((i) => i.id === id);
  if (!item) return null;
  drop(id);
  return item;
}

function drop(id: string): void {
  const next = (save.pendingBag ?? []).filter((i) => i.id !== id);
  save.pendingBag = next.length ? next : null;
}

function showGear(): void {
  onCamp = false;
  panel.hidden = false;
  shaft.hidden = true;
  renderGear(panel, save, Date.now(), (id) => {
    const idx = save.inventory.findIndex((i) => i.id === id);
    if (idx < 0) return;
    const [item] = save.inventory.splice(idx, 1);
    if (!item) return;
    const prev = equipItem(save, item);
    if (prev) keepItem(save, prev);
    persist();
    showGear();
  }, () => {
    reclaimSetAside(save);
    persist();
    showGear();
  }, () => showCamp());
}

function showReforge(err: string): void {
  onCamp = false;
  panel.hidden = false;
  shaft.hidden = true;
  renderReforge(panel, save, (id, index) => {
    const rng = new Rng(crypto.getRandomValues(new Uint32Array(1))[0]! || 1);
    const fail = tryReforge(save, id, index, rng);
    persist();
    showReforge(fail ?? '');
  }, () => showCamp(), err);
}

async function showRank(err: string): Promise<void> {
  onCamp = false;
  panel.hidden = false;
  shaft.hidden = true;
  const season = activeWindow(save, Date.now());
  const rows = await fetchBoard(season.id);
  if (run) return;
  renderRank(panel, {
    save,
    rows,
    signedIn: !!currentUser(),
    canSignIn: firebaseReady() && !!window.webkit?.messageHandlers?.echo,
    err,
    onName: (name) => {
      const fail = setBoardName(save, name);
      if (fail) {
        void showRank(fail);
        return;
      }
      persist();
      void pushBoardName(save.boardName);
      void flushReplay();
      void showRank('');
    },
    onSignIn: () => askAppleSignIn(),
    onSignOut: () => void signOutBoard().then(() => showRank('')),
    onDelete: () => {
      void deleteAccount().then((fail) => {
        if (!fail) note = 'The account and its board row are gone.';
        showCamp(fail ?? undefined);
      });
    },
    onBack: () => showCamp(),
  });
}

function claim(): void {
  const pay = claimNight(save, Date.now());
  cancelNight();
  persist();
  if (!pay) return showCamp();
  openSheet('Night shift', `${pay.shards} shards and ${pay.dust} dust. Scrap stayed dust. This is not a score.`);
}

async function refreshSeason(): Promise<void> {
  const fetched = await fetchSeason();
  if (!fetched || run) return;
  const notes = syncSeason(save, { ...fetched, fetchedAt: Date.now() }, Date.now());
  persist();
  if (onCamp) showCamp(notes.join(' '));
}

async function flushReplay(): Promise<void> {
  const replay = save.pendingReplay;
  if (!replay || !save.boardName || !currentUser()) return;
  const res = await submitReplay(replay, save.boardName);
  if (res.ok) {
    save.pendingReplay = null;
    note = 'The clear is on the board.';
    persist();
  } else if (res.reason === 'version' || res.reason === 'season' || res.reason === 'closed' || res.reason === 'mismatch' || res.reason === 'worse' || res.reason === 'name') {
    save.pendingReplay = null;
    note = `The board rejected the unsent clear (${res.reason}).`;
    persist();
  } else note = 'This result will post later.';
  if (onCamp && !run) showCamp();
}

function wireStick(): void {
  const stick = document.getElementById('stick')!;
  const nub = document.getElementById('nub')!;
  let sid = -1;
  let ox = 0;
  let oy = 0;
  const reach = 40;
  const end = (e: PointerEvent) => {
    if (e.pointerId !== sid) return;
    sid = -1;
    input.mx = 0;
    input.my = 0;
    nub.style.transform = 'translate(0px, 0px)';
  };
  stick.addEventListener('pointerdown', (e) => {
    sid = e.pointerId;
    const r = stick.getBoundingClientRect();
    ox = r.left + r.width / 2;
    oy = r.top + r.height / 2;
    stick.setPointerCapture(e.pointerId);
    slide(e);
    e.preventDefault();
  });
  stick.addEventListener('pointermove', (e) => {
    if (e.pointerId === sid) slide(e);
  });
  stick.addEventListener('pointerup', end);
  stick.addEventListener('pointercancel', end);
  function slide(e: PointerEvent): void {
    const dx = e.clientX - ox;
    const dy = e.clientY - oy;
    const len = Math.hypot(dx, dy) || 1;
    const clamped = Math.min(reach, len);
    nub.style.transform = `translate(${(dx / len) * clamped}px, ${(dy / len) * clamped}px)`;
    if (clamped / reach < 0.18) {
      input.mx = 0;
      input.my = 0;
    } else {
      input.mx = dx / len * (clamped / reach);
      input.my = dy / len * (clamped / reach);
    }
  }
}

function wireButtons(): void {
  const held = new Map<number, number>();
  const refresh = () => {
    let bits = 0;
    for (const bit of held.values()) bits |= bit;
    input.b = bits;
  };
  document.querySelectorAll<HTMLButtonElement>('.right-pad button').forEach((btn) => {
    const bit = Number(btn.dataset.bit);
    btn.addEventListener('pointerdown', (e) => {
      if (btn.disabled) return;
      held.set(e.pointerId, bit);
      btn.setPointerCapture(e.pointerId);
      refresh();
      e.preventDefault();
    });
    const release = (e: PointerEvent) => {
      held.delete(e.pointerId);
      refresh();
    };
    btn.addEventListener('pointerup', release);
    btn.addEventListener('pointercancel', release);
  });
}
