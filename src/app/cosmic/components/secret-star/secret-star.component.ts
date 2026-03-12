import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

type StarState = 'idle' | 'awakening' | 'unstable';

@Component({
  selector: 'app-secret-star',
  templateUrl: './secret-star.component.html',
  styleUrls: ['./secret-star.component.scss'],
})
export class SecretStarComponent {
  private cosmic = inject(CosmicLayerService);
  private router = inject(Router);
  starState = computed<StarState>(() => {
    const clicks = this.cosmic.clickCount();
    if (clicks === 1) return 'awakening';
    if (clicks === 2) return 'unstable';
    return 'idle';
  });

  handleClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    const clicks = this.cosmic.advance();
    if (clicks === 3) {
      this.cosmic.activateWormhole();
      setTimeout(() => {
        this.router.navigate(['/wormhole']);
        this.cosmic.resetClicks();
      }, 1200);
    }
  }
}