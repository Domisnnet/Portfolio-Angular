import { Component, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer-service';
import { LayerIndicatorComponent } from '@app/cosmic/components/layer-indicator/layer-indicator.component';

@Component({
  selector: 'app-cosmic-section',
  standalone: true,
  imports: [LayerIndicatorComponent],
  templateUrl: './cosmic-section.component.html',
  styleUrls: ['./cosmic-section.component.scss'],
})
export class CosmicSectionComponent {
  cosmicLayer = inject(CosmicLayerService);
}