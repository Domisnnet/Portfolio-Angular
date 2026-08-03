import { Component, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

@Component({
  selector: 'app-secret-star',
  standalone: true,
  imports: [],
  templateUrl: './secret-star.component.html',
  styleUrls: ['./secret-star.component.scss'],
})
export class SecretStarComponent {
  protected readonly cosmic = inject(CosmicLayerService);
  readonly stage = this.cosmic.jumpStage;
  handleClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cosmic.advance();
  }
}