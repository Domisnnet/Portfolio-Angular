import { Component, computed, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-wormhole',
  standalone: true,
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss'],
})
export class WormholeComponent {
  private readonly cosmic = inject(CosmicLayerService);
  readonly isActive = computed(() => this.cosmic.layer() === 'wormhole' );
  onTransitionEnd(event: AnimationEvent): void {
    if (event.target !== event.currentTarget || event.animationName !== 'wormhole-open' ) { return; }
    this.cosmic.finishJump();
  }
}