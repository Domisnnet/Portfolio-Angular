import { Injectable, computed } from '@angular/core';
import { cosmicLayerSignal } from './cosmic-layer-signal';
import { CosmicLayer } from './cosmic-layer-types';

@Injectable({
  providedIn: 'root'
})
export class CosmicLayerService {

  readonly layer = cosmicLayerSignal;

  readonly isSilent = computed(() => 
    this.layer() === CosmicLayer.SILENT
  );

  readonly isWarp = computed(() => 
    this.layer() === CosmicLayer.WARP
  );

  setLayer(layer: CosmicLayer) {
    this.layer.set(layer);
  }

  toggleSilent() {
    if (this.layer() === CosmicLayer.SILENT) {
      this.layer.set(CosmicLayer.ACTIVE);
    } else {
      this.layer.set(CosmicLayer.SILENT);
    }
  }
}