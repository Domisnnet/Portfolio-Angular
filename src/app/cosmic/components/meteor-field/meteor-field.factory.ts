import { Injectable } from '@angular/core';
import { METEOR_FIELD_CONFIG, MeteorLayerConfig, NumericRange } from './meteor-field.config';
import { Meteor, MeteorLayer } from './meteor-field.types';

@Injectable({
  providedIn: 'root'
})
export class MeteorFieldFactory {
  create(): readonly Meteor[] { return Array.from( { length: METEOR_FIELD_CONFIG.total }, (_, index) => this.createMeteor(index)); }
  groupByLayer( meteors: readonly Meteor[] ): Readonly<Record<MeteorLayer, readonly Meteor[]>> {
    return {
      far: meteors.filter(meteor => meteor.layer === 'far'),
      mid: meteors.filter(meteor => meteor.layer === 'mid'),
      near: meteors.filter(meteor => meteor.layer === 'near')
    };
  }
  private createMeteor(index: number): Meteor {
    const layer = this.getLayer(index);
    const layerConfig = METEOR_FIELD_CONFIG.layers[layer];
    return {
      id: index,
      image: this.getImage(index),
      x: this.getX(index),
      y: this.getY(index),
      size: `${this.getValue(index, layerConfig.size)}px`,
      speed: `${this.getValue(index + 20, layerConfig.speed)}s`,
      angle: this.getValue(index + 40, METEOR_FIELD_CONFIG.angle),
      delay: `${this.getValue(index + 60, METEOR_FIELD_CONFIG.delay)}s`,
      intensity: this.getValue(index + 80, layerConfig.intensity),
      blur: layerConfig.blur,
      layer
    };
  }
  private getLayer(index: number): MeteorLayer {
    const position = index % 10;
    if (position <= 2) { return 'near'; }
    if (position <= 6) { return 'mid'; } return 'far';
  }
  private getImage(index: number): string {
    const images = METEOR_FIELD_CONFIG.images;
    return images[index % images.length];
  }
  private getX(index: number): number {
    const ranges = METEOR_FIELD_CONFIG.xRanges;
    const range = ranges[index % ranges.length];
    return this.getValue(index + 100, range);
  }
  private getY(index: number): number {
    const bandCount = METEOR_FIELD_CONFIG.verticalBands;
    const band = index % bandCount;
    const bandHeight = 100 / bandCount;
    const noise = this.getValue( index + 120, { min: -bandHeight * 0.35, max: bandHeight * 0.35 } ); return Number((band * bandHeight + noise).toFixed(2));
  }
  private getValue( seed: number, range: NumericRange ): number {
    const value = Math.sin(seed * 12.9898) * 43758.5453;
    const normalized = value - Math.floor(value);
    return Number(( range.min + normalized * (range.max - range.min)).toFixed(2));
  }
}