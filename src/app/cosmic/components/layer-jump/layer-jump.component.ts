import { Component, computed } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

@Component({
  selector: 'app-layer-jump',
  standalone: true,
  templateUrl: './layer-jump.component.html',
  styleUrls: ['./layer-jump.component.scss']
})
export class LayerJumpComponent {
  constructor(private cosmic: CosmicLayerService) {}
  circumference = 276;
  dashOffset = computed(() => {
    const index = this.cosmic.currentLayerIndex();
    const total = this.cosmic.totalLayers() - 1;
    const progress = index / total;
    return this.circumference - (progress * this.circumference);
  });

  advance() { this.cosmic.advance(); }
}