// Effect vocabulary shared by weapon swings and artifact buttons.

export type StatusDef =
  | { kind: 'slow'; pct: number; duration: number }
  | { kind: 'stun'; duration: number }
  | { kind: 'bleed'; coefPerSec: number; duration: number }
  | { kind: 'burn'; coefPerSec: number; duration: number }
  | { kind: 'vulnerable'; pct: number; duration: number };

export interface BuffDef {
  id: string;
  name: string;
  duration: number;
  damagePct?: number;
  damageReduction?: number;
  moveSpeedPct?: number;
  attackSpeedPct?: number;
  immune?: boolean;
  regenPct?: number;
}

export type SkillEffect =
  | { type: 'melee'; range: number; arc: number; coef: number; applies?: StatusDef; knockback?: number }
  | {
      type: 'projectile';
      speed: number;
      range: number;
      coef: number;
      radius: number;
      count?: number;
      spread?: number;
      pierce?: number;
      explodeRadius?: number;
      applies?: StatusDef;
      visual: string;
    }
  | { type: 'aoeTarget'; radius: number; coef: number; maxRange: number; delay?: number; applies?: StatusDef; visual: string }
  | { type: 'aoeSelf'; radius: number; coef: number; applies?: StatusDef; visual: string }
  | { type: 'dash'; distance: number; coef: number; radius: number; blink?: boolean; applies?: StatusDef; visual: string }
  | { type: 'buff'; buff: BuffDef }
  | { type: 'heal'; pct: number }
  | { type: 'summon'; monsterId: string; count: number; duration: number }
  | {
      type: 'zone';
      radius: number;
      coefPerSec: number;
      duration: number;
      maxRange: number;
      applies?: StatusDef;
      visual: string;
    };
