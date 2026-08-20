import { Injectable } from '@angular/core';
import { METEOR_FIELD_CONFIG, MeteorLayerConfig, NumericRange } from './meteor-field.config';
import { Meteor, MeteorLayer } from './meteor-field.types';

@Injectable({
  providedIn: 'root'
})
export class MeteorFieldFactory {
  create( total: number = METEOR_FIELD_CONFIG.total ): readonly Meteor[] {
    return Array.from({ length: total }, (_, index) => { const layer = this.getLayer(index); const layerConfig = METEOR_FIELD_CONFIG.layers[layer]; return { id: index, image: this.getImage(index), x: this.getValue(index, METEOR_FIELD_CONFIG.x), y: this.getY(index), size: `${this.getValue(index, layerConfig.size)}px`, speed: `${this.getValue(index, layerConfig.speed)}s`, angle: this.getValue(index, METEOR_FIELD_CONFIG.angle), delay: `${this.getValue(index, METEOR_FIELD_CONFIG.delay)}s`, intensity: this.getValue(index, layerConfig.intensity), blur: layerConfig.blur, layer }; });
  }
  groupByLayer( meteors: readonly Meteor[] ): Readonly<Record<MeteorLayer, readonly Meteor[]>> { return { far: meteors.filter(meteor => meteor.layer === 'far'), mid: meteors.filter(meteor => meteor.layer === 'mid'), near: meteors.filter(meteor => meteor.layer === 'near') }; }
  private getLayer(index: number): MeteorLayer { const position = index % 10; if (position <= 2) { return 'near'; } if (position <= 6) { return 'mid'; } return 'far'; }
  private getImage(index: number): string { const images = METEOR_FIELD_CONFIG.images; return images[index % images.length]; }
  private getY(index: number): number { const band = index % METEOR_FIELD_CONFIG.verticalBands; const bandHeight = 100 / METEOR_FIELD_CONFIG.verticalBands; const variation = this.randomBetween(index, -8, 8); return band * bandHeight + variation; }
  private getValue( seed: number, range: NumericRange ): number { const value = Math.sin(seed * 12.9898) * 43758.5453; const normalized = value - Math.floor(value); return Number((range.min + normalized * (range.max - range.min)).toFixed(2)); }
  private randomBetween( seed: number, min: number, max: number ): number { return this.getValue(seed + 100, { min, max }); }
}