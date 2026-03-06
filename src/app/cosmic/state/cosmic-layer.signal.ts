import { signal } from '@angular/core';
import { CosmicLayer } from '@app/cosmic/state/cosmic-layer.types';

export const cosmicLayerSignal = signal<CosmicLayer>('deep-space');