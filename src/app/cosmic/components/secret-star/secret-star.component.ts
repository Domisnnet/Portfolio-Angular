import { Component, computed, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

type StarState =
  | 'idle'
  | 'awakening'
  | 'unstable'
  | 'charged';

@Component({
  selector: 'app-secret-star',
  standalone: true,
  imports: [],
  templateUrl: './secret-star.component.html',
  styleUrls: ['./secret-star.component.scss'],
})
export class SecretStarComponent {
  private readonly cosmic = inject(CosmicLayerService);
  readonly starState = computed<StarState>(() => {
    switch (this.cosmic.clickCount()) {
      case 1: return 'awakening';
      case 2: return 'unstable';
      case 3: return 'charged';
      default: return 'idle';
    }
  });
  handleClick(event: MouseEvent): void { event.preventDefault(); event.stopPropagation(); this.cosmic.advance(); }
}