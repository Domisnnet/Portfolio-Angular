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
  private layers = [
    'deep-space',
    'stable-orbit',
    'unstable-orbit',
    'wormhole'
  ];

  circumference = 276;
  dashOffset = computed(() => {
    const current = this.cosmic.layer();
    const index = this.layers.indexOf(current);
    const progress = index / (this.layers.length - 1);
    return this.circumference - (progress * this.circumference);
  });

  advance() {
    this.cosmic.advance();
  }
}