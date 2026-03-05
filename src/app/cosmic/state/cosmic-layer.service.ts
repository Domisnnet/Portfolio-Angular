import { Injectable, effect } from '@angular/core';
import { cosmicLayerSignal } from '@app/cosmic/state/cosmic-layer.signal';
import { CosmicLayer } from '@app/cosmic/state/cosmic-layer.types';

@Injectable({
  providedIn: 'root'
})
export class CosmicLayerService {
  readonly layer = cosmicLayerSignal.asReadonly();

  /** ordem oficial das layers */
  private readonly order: CosmicLayer[] = [
    'deep-space',
    'stable-orbit',
    'unstable-orbit',
    'wormhole'
  ];

  constructor() {
    effect(() => {
      document.documentElement.setAttribute( 'data-layer', cosmicLayerSignal() );
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

  /** índice atual da layer */
  currentLayerIndex(): number {
    const current = cosmicLayerSignal();
    return this.order.indexOf(current);
  }

  /** quantidade total de layers */
  totalLayers(): number {
    return this.order.length;
  }

}