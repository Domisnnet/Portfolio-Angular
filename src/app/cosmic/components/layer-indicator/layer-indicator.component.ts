import { Component } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer-service';

@Component({
  selector: 'app-layer-indicator',
  standalone: true,
  templateUrl: './layer-indicator.component.html',
  styleUrls: ['./layer-indicator.component.scss']
})
export class LayerIndicatorComponent {

  constructor(public cosmic: CosmicLayerService) {}
}