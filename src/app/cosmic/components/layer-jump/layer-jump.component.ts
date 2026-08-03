import { Component, computed, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

@Component({
  selector: 'app-layer-jump',
  standalone: true,
  imports: [],
  templateUrl: './layer-jump.component.html',
  styleUrls: ['./layer-jump.component.scss'],
})
export class LayerJumpComponent {
  private readonly cosmic = inject(CosmicLayerService);
  readonly stage = this.cosmic.jumpStage;
  readonly progress = this.cosmic.jumpProgress;
  private static readonly RADIUS = 44;
  readonly circumference = 2 * Math.PI * LayerJumpComponent.RADIUS;
  readonly dashOffset = computed(() => { return this.circumference - (this.progress() / 3) * this.circumference; });
}