import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COSMIC_LABELS } from '@app/cosmic/config/cosmic-labels.config';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-layer-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layer-indicator.component.html',
  styleUrls: ['./layer-indicator.component.scss'],
})
export class LayerIndicatorComponent {
  readonly labels = COSMIC_LABELS;
  constructor(
    protected readonly cosmic: CosmicLayerService,
  ) {}
}