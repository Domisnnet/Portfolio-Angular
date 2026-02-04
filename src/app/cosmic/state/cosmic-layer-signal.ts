import { signal } from '@angular/core';
import { CosmicLayer } from './cosmic-layer-types';

export const cosmicLayerSignal = signal<CosmicLayer>('deep-space');