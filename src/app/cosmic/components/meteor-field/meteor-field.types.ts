export type MeteorLayer = 'far' | 'mid' | 'near';

export interface Meteor {
  readonly id: number;
  readonly image: string;
  readonly x: number;
  readonly y: number;
  readonly size: string;
  readonly speed: string;
  readonly angle: number;
  readonly delay: string;
  readonly intensity: number;
  readonly blur: string;
  readonly layer: MeteorLayer;
}