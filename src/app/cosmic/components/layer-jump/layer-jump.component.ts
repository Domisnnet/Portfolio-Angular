import { Component, computed, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layer-jump',
  standalone: true,
  templateUrl: './layer-jump.component.html',
  styleUrls: ['./layer-jump.component.scss'],
})
export class LayerJumpComponent {
  private cosmic = inject(CosmicLayerService);
  private router = inject(Router);
  circumference = 276;
  dashOffset = computed(() => {
    const index = this.cosmic.currentLayerIndex();
    const total = this.cosmic.totalLayers() - 1;
    const progress = index / total;
    return this.circumference - (progress * this.circumference);
  });

  handleClick() {
    const clicks = this.cosmic.registerClick();
    if (clicks === 3) {
      this.cosmic.activateWormhole();
      setTimeout(() => {
        this.router.navigate(['/wormhole']);
      }, 1200);
    }
  }
}