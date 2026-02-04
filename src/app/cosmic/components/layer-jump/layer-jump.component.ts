import { Component } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer-service';

@Component({
  selector: 'app-layer-jump',
  standalone: true,
  templateUrl: './layer-jump.component.html',
  styleUrls: ['./layer-jump.component.scss']
})
export class LayerJumpComponent {

  constructor(private cosmic: CosmicLayerService) {}

  advance() {
    this.cosmic.advance();
  }
}