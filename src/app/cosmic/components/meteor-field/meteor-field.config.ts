import { MeteorLayer } from './meteor-field.types';

export interface NumericRange {
  readonly min: number;
  readonly max: number;
}

export interface MeteorLayerConfig {
  readonly layer: MeteorLayer;
  readonly size: NumericRange;
  readonly speed: NumericRange;
  readonly intensity: NumericRange;
  readonly blur: string;
}

export const METEOR_FIELD_CONFIG = {
  total: 72,
  verticalBands: 12,
  angle: { min: 8, max: 22 },
  delay: { min: -18, max: 0 },
  x: { min: 82, max: 138 },
  y: { min: -10, max: 108 },
  layers: {
    far: { layer: 'far', size: { min: 32, max: 110 }, speed: { min: 5, max: 11 }, intensity: { min: 0.1, max: 0.3 }, blur: 'var(--meteor-blur-far)' },
    mid: { layer: 'mid', size: { min: 120, max: 280 }, speed: { min: 8, max: 15 }, intensity: { min: 0.24, max: 0.52 }, blur: 'var(--meteor-blur-mid)' },
    near: { layer: 'near', size: { min: 260, max: 520 }, speed: { min: 12, max: 19 }, intensity: { min: 0.42, max: 0.75 }, blur: 'var(--meteor-blur-near)' }
  },

  images: [
    'assets/images/meteor1.png',
    'assets/images/meteor2.png',
    'assets/images/meteor3.png',
    'assets/images/meteor4.png',
    'assets/images/meteor5.png',
    'assets/images/meteor6.png'
  ]
} as const;