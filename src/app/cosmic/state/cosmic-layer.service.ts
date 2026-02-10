import { Injectable, effect } from '@angular/core';
import { cosmicLayerSignal } from './cosmic-layer.signal';
import { CosmicLayer } from './cosmic-layer.types';

@Injectable({
  providedIn: 'root'
})
export class CosmicLayerService {

  readonly layer = cosmicLayerSignal.asReadonly();

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
    const order: CosmicLayer[] = [
      'deep-space',
      'stable-orbit',
      'unstable-orbit',
      'wormhole'
    ];

    const current = cosmicLayerSignal();
    const index = order.indexOf(current);
    const next = order[(index + 1) % order.length];

    cosmicLayerSignal.set(next);
  }
}