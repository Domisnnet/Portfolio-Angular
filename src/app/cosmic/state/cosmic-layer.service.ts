import { Injectable, effect, signal } from '@angular/core';
import { cosmicLayerSignal } from '@app/cosmic/state/cosmic-layer.signal';
import { CosmicLayer } from '@app/cosmic/state/cosmic-layer.types';

@Injectable({
  providedIn: 'root'
})
export class CosmicLayerService {
  readonly layer = cosmicLayerSignal.asReadonly();
  private readonly order: CosmicLayer[] = [
    'projects',
    'deep-space',
    'stable-orbit',
    'unstable-orbit'
  ];

  private clickCharge = signal(0);
  readonly clickCount = this.clickCharge.asReadonly();
  constructor() {
    effect(() => {
      document.documentElement.setAttribute(
        'data-layer',
        cosmicLayerSignal()
      );
    });
  }

  advance(): number {
    const next = Math.min(this.clickCharge() + 1, 3);
    this.clickCharge.set(next);
    return next;
  }

  resetClicks(): void {
    this.clickCharge.set(0);
  }

  activateWormhole(): void {
    cosmicLayerSignal.set('wormhole');
  }

  set(layer: CosmicLayer): void {
    cosmicLayerSignal.set(layer);
  }

  currentLayerIndex(): number {
    const current = cosmicLayerSignal();
    return this.order.indexOf(current);
  }

  totalLayers(): number {
    return this.order.length;
  }
}