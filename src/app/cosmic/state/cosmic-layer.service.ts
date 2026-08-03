import { Injectable, effect, signal } from '@angular/core';
import { cosmicLayerSignal } from '@app/cosmic/state/cosmic-layer.signal';
import { CosmicLayer } from '@app/cosmic/state/cosmic-layer.types';

@Injectable({
  providedIn: 'root',
})
export class CosmicLayerService {
  readonly layer = cosmicLayerSignal.asReadonly();
  private readonly order: CosmicLayer[] = [ 'projects', 'deep-space', 'unstable-orbit' ];
  private readonly clickCharge = signal(0);
  readonly clickCount = this.clickCharge.asReadonly();
  constructor() {
    effect(() => { document.documentElement.setAttribute('data-layer', cosmicLayerSignal()); });
  }
  advance(): void {
    const nextCharge = Math.min(this.clickCharge() + 1, 3 );
    this.clickCharge.set(nextCharge);
    if (nextCharge === 3) { this.activateWormhole(); }
  }
  resetClicks(): void { this.clickCharge.set(0); }
  set(layer: CosmicLayer): void { cosmicLayerSignal.set(layer); }
  activateWormhole(): void { this.set('wormhole'); }
  currentLayerIndex(): number { return this.order.indexOf(this.layer()); }
  totalLayers(): number { return this.order.length; }
  hasNextLayer(): boolean { return this.currentLayerIndex() < this.order.length - 1; }
  nextLayer(): CosmicLayer | null {
    if (!this.hasNextLayer()) { return null; }
    return this.order[ this.currentLayerIndex() + 1 ];
  }
  advanceLayer(): void { const next = this.nextLayer(); if (next) { this.set(next); }
  }
}