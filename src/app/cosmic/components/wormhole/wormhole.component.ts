import { Component, computed } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-wormhole',
  standalone: true,
  imports: [],
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss'],
})
export class WormholeComponent {
  constructor(private cosmic: CosmicLayerService) {}
  isActive = computed(() => this.cosmic.layer() === 'wormhole');
}
