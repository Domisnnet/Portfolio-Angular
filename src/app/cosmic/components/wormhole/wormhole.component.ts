import { Component, computed } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer-service';

@Component({
  selector: 'app-wormhole',
  standalone: true,
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss']
})
export class WormholeComponent {

  constructor(private cosmic: CosmicLayerService) {}

  layer = computed(() => this.cosmic.layer());

  isActive = computed(() =>
    this.layer() === 'wormhole' ||
    this.layer() === 'transition'
  );
}