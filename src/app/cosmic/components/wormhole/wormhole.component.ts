import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-wormhole',
  standalone: true,
  imports: [],
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss'],
})
export class WormholeComponent {
  private readonly cosmic = inject(CosmicLayerService);
  private readonly router = inject(Router);
  readonly isActive = computed(() => this.cosmic.layer() === 'wormhole');
  onTransitionEnd(event: AnimationEvent): void {
    if ( event.target !== event.currentTarget || event.animationName !== 'wormhole-open' ) { return; }
    this.cosmic.finishJump();
    void this.router.navigate(['/deep-space']);
  }
}