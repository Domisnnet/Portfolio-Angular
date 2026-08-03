import { Component, computed, inject, signal } from '@angular/core';
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
  readonly circumference = 276;
  private readonly clickLock = signal(false);
  readonly dashOffset = computed(() => {
    const progress = this.cosmic.clickCount() / 3;
    return this.circumference - (progress * this.circumference);
  });
  advance(event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();
    if (this.clickLock()) { return; }
    this.clickLock.set(true);
    this.cosmic.advance();
    setTimeout(() => { this.clickLock.set(false); }, 120); 
  }
}