// Small synthesizer. There are no sample files. The first touch unlocks the context.

type Cue = 'swing' | 'whiff' | 'hit' | 'hurt' | 'die' | 'shard' | 'globe' | 'level' | 'vessel' | 'ui';

let ctx: AudioContext | null = null;
let drone: { src: AudioBufferSourceNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
let scene: 'shaft' | 'camp' | 'off' = 'off';
let lastHit = 0;

function ac(): AudioContext | null {
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!ctx) ctx = new Ctor();
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

export function unlockAudio(): void {
  ac();
  if (scene !== 'off') ensureDrone();
}

export function setScene(next: 'shaft' | 'camp' | 'off'): void {
  scene = next;
  if (!ctx || ctx.state === 'suspended') return;
  ensureDrone();
}

function ensureDrone(): void {
  const c = ctx;
  if (!c) return;
  if (!drone) {
    const len = c.sampleRate * 2;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < len; i++) {
      brown = brown * 0.98 + (Math.random() * 2 - 1) * 0.02;
      data[i] = brown;
    }
    const src = c.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    const gain = c.createGain();
    gain.gain.value = 0;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(c.destination);
    src.start();
    drone = { src, filter, gain };
  }
  const t = c.currentTime;
  const shaft = scene === 'shaft';
  const on = scene !== 'off';
  drone.filter.frequency.setTargetAtTime(shaft ? 140 : 520, t, 0.4);
  drone.gain.gain.setTargetAtTime(on ? (shaft ? 0.045 : 0.018) : 0, t, 0.3);
}

function env(freq: number, dur: number, type: OscillatorType, gain: number, slide?: number): void {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, slide), t + dur);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(dur: number, gain: number, freq: number): void {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  const n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = freq;
  filter.Q.value = 0.7;
  const g = c.createGain();
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(c.destination);
  src.start(t);
  src.stop(t + dur + 0.02);
}

export function sfx(cue: Cue): void {
  if (cue === 'hit') {
    const now = performance.now();
    if (now - lastHit < 45) return;
    lastHit = now;
  }
  if (cue === 'swing') {
    noise(0.07, 0.06, 240);
    env(170, 0.06, 'square', 0.03, 90);
  } else if (cue === 'whiff') {
    noise(0.05, 0.025, 500);
  } else if (cue === 'hit') {
    noise(0.05, 0.07, 180);
    env(140, 0.05, 'square', 0.04, 70);
  } else if (cue === 'hurt') {
    env(110, 0.14, 'sawtooth', 0.04, 55);
  } else if (cue === 'die') {
    env(240, 0.45, 'triangle', 0.06, 48);
  } else if (cue === 'shard') {
    env(880, 0.07, 'triangle', 0.04, 1320);
  } else if (cue === 'globe') {
    env(520, 0.12, 'sine', 0.04, 780);
  } else if (cue === 'level') {
    env(523, 0.12, 'triangle', 0.05);
    env(659, 0.14, 'triangle', 0.04);
    env(784, 0.18, 'triangle', 0.04);
  } else if (cue === 'vessel') {
    noise(0.4, 0.08, 90);
    env(55, 0.5, 'sine', 0.07, 40);
  } else if (cue === 'ui') {
    env(660, 0.04, 'sine', 0.02);
  }
}
