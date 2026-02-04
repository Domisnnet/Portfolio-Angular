import { Injectable } from '@angular/core';
import { cosmicLayer } from './cosmic-layer-signal';
import { CosmicLayer } from './cosmic-layer-type';

@Injectable({ providedIn: 'root' })
export class CosmicLayerService {
  advance() {
    const current = cosmicLayer();

    if (current === 'unstable-orbit') {
      cosmicLayer.set('wormhole');
      setTimeout(() => cosmicLayer.set('deep-echo'), 1800);
      return;
    }

    const order: CosmicLayer[] = [
      'surface',
      'unstable-orbit',
      'deep-echo',
      'event-horizon'
    ];

    const index = order.indexOf(current);
    if (index < order.length - 1) {
      cosmicLayer.set(order[index + 1]);
    }
  }
}