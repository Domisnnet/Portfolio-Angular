import { signal } from '@angular/core';
import { CosmicLayer } from './cosmic-layer-type';

export const cosmicLayer = signal<CosmicLayer>('surface');