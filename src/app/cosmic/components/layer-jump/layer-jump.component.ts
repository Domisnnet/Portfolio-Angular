import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

@Component({
  selector: 'app-layer-jump',
  templateUrl: './layer-jump.component.html',
  styleUrls: ['./layer-jump.component.scss'],
})
export class LayerJumpComponent {
  private cosmic = inject(CosmicLayerService);
  private router = inject(Router);
  circumference = 276;
  private clickLock = false;
  dashOffset = computed(() => {
    const clicks = this.cosmic.clickCount();
    const progress = clicks / 3;
    return this.circumference - progress * this.circumference;
  });

  advance(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (this.clickLock) return;
    this.clickLock = true;

    const clicks = this.cosmic.advance();
    if (clicks === 3) {
      this.cosmic.activateWormhole();
      setTimeout(() => {
        this.router.navigate(['/wormhole']);
        this.cosmic.resetClicks();
        this.clickLock = false;
      }, 1200);
      return;
    }

    setTimeout(() => {
      this.clickLock = false;
    }, 120);
  }
}