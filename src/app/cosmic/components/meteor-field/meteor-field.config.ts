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
  total: 96,
  verticalBands: 16,
  horizontalBands: 8,
  x: { min: 10, max: 118 },
  y: { min: -8, max: 108 },
  angle: { min: 8, max: 22 },
  delay: { min: -40, max: 0 },
  layers: { 
    far: { layer: 'far', size: { min: 32, max: 110 }, speed: { min: 22, max: 34 }, intensity: { min: 0.1, max: 0.3 }, blur: 'var(--meteor-blur-far)' },
    mid: { layer: 'mid', size: { min: 120, max: 280 }, speed: { min: 30, max: 44 }, intensity: { min: 0.24, max: 0.52 }, blur: 'var(--meteor-blur-mid)' },
    near: { layer: 'near', size: { min: 260, max: 520 }, speed: { min: 38, max: 56 }, intensity: { min: 0.42, max: 0.75 }, blur: 'var(--meteor-blur-near)' }
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