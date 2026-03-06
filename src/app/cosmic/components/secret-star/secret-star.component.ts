import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

type StarState =
  | 'idle'
  | 'awakening'
  | 'unstable';

@Component({
  selector: 'app-secret-star',
  standalone: true,
  templateUrl: './secret-star.component.html',
  styleUrls: ['./secret-star.component.scss'],
})
export class SecretStarComponent {
  private router = inject(Router);
  private cosmicLayer = inject(CosmicLayerService);
  starState: StarState = 'idle';
  private clicks = 0;
  private resetTimer?: number;

  handleClick(): void {
    this.clicks++;
    if (this.clicks === 1) {
      this.starState = 'awakening';
    }

    if (this.clicks === 2) {
      this.starState = 'unstable';
    }

    if (this.clicks === 3) {
      this.activateWormhole();
      return;
    }
    this.resetClicks();
  }

  private resetClicks(): void {
    clearTimeout(this.resetTimer);
    const delayValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--secret-star-click-reset');
    const delay = parseFloat(delayValue) || 2000;
    this.resetTimer = window.setTimeout(() => {
      this.clicks = 0;
      this.starState = 'idle';
    }, delay);
  }

  private activateWormhole(): void {
    this.cosmicLayer.set('wormhole');
    const delayValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--secret-wormhole-delay');
    const delay = parseFloat(delayValue) || 1200;
    setTimeout(() => {
      this.router.navigate(['/stable-orbit']);
      this.cosmicLayer.set('stable-orbit');
    }, delay);
  }
}