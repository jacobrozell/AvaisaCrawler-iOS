// One body. The Warden's anchor is Flesh. Reliquaries author their own anchors.

export type AnchorStat = 'flesh' | 'earth' | 'sky';

export interface ResourceDef {
  id: 'echo';
  name: string;
  max: number;
  regen: number;
  decayOutOfCombat?: number;
  color: string;
}

export interface ClassDef {
  id: 'warden';
  name: string;
  anchor: AnchorStat;
  resource: ResourceDef;
  baseLife: number;
  lifePerLevel: number;
  baseArmor: number;
  color: string;
  accent: string;
}

export const WARDEN: ClassDef = {
  id: 'warden',
  name: 'Flesh-Warden',
  anchor: 'flesh',
  resource: { id: 'echo', name: 'Echo', max: 100, regen: 0, decayOutOfCombat: 4, color: '#c8343c' },
  baseLife: 130,
  lifePerLevel: 16,
  baseArmor: 18,
  color: '#b8433c',
  accent: '#e9c49a',
};

export const CLASSES = { warden: WARDEN } as const;

/** Echo Surge: at 80 Echo the Warden deals more and takes more. */
export const ECHO_SURGE_THRESHOLD = 80;
export const ECHO_SURGE_DAMAGE = 0.2;
export const ECHO_SURGE_VULNERABILITY = 0.1;
