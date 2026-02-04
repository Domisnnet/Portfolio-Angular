import { signal } from '@angular/core';
import { CosmicLayer } from './cosmic-layer-types';

export const cosmicLayer = signal<CosmicLayer>('deep-space');