import { Injectable, effect } from '@angular/core';
import { cosmicLayerSignal } from '@app/cosmic/state/cosmic-layer.signal';
import { CosmicLayer } from '@app/cosmic/state/cosmic-layer.types';

@Injectable({
  providedIn: 'root'
})
export class CosmicLayerService {
  readonly layer = cosmicLayerSignal.asReadonly();
  private readonly order: CosmicLayer[] = [
    'deep-space',
    'wormhole',
    'stable-orbit',
    'unstable-orbit'
  ];

  constructor() {
    effect(() => {
      document.documentElement.setAttribute(
        'data-layer',
        cosmicLayerSignal()
      );
    });
  }

  set(layer: CosmicLayer) {
    cosmicLayerSignal.set(layer);
  }

  advance() {
    const current = cosmicLayerSignal();
    const index = this.order.indexOf(current);
    const next = this.order[(index + 1) % this.order.length];
    cosmicLayerSignal.set(next);
  }

  currentLayerIndex(): number {
    const current = cosmicLayerSignal();
    return this.order.indexOf(current);
  }

  totalLayers(): number {
    return this.order.length;
  }
}