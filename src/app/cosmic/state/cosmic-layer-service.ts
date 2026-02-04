import { Injectable, signal, effect } from '@angular/core';
import { CosmicLayer } from './cosmic-layer-types';

@Injectable({
  providedIn: 'root'
})
export class CosmicLayerService {

  private readonly _layer = signal<CosmicLayer>('deep-space');
  readonly layer = this._layer.asReadonly();

  constructor() {
    effect(() => {
      document.documentElement.setAttribute(
        'data-layer',
        this._layer()
      );
    });
  }

  set(layer: CosmicLayer) {
    this._layer.set(layer);
  }

  advance() {
    const order: CosmicLayer[] = [
      'deep-space',
      'stable-orbit',
      'unstable-orbit',
      'wormhole'
    ];

    const current = this._layer();
    const index = order.indexOf(current);

    const next = order[(index + 1) % order.length];

    this._layer.set(next);
  }
}