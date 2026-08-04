import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-layer-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layer-indicator.component.html',
  styleUrls: ['./layer-indicator.component.scss'],
})
export class LayerIndicatorComponent {
  constructor(
    public readonly cosmic: CosmicLayerService,
  ) {}
}