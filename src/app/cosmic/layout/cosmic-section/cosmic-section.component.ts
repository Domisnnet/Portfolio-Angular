import { Component, computed } from '@angular/core';
import { cosmicLayer } from '../../state/cosmic-layer-signal';
import { LayerIndicatorComponent } from '@app/cosmic/components/layer-indicator/layer-indicator.component';

@Component({
  selector: 'app-cosmic-section',
  standalone: true,
  imports: [LayerIndicatorComponent],
  templateUrl: './cosmic-section.component.html',
  styleUrls: ['./cosmic-section.component.scss']
})
export class CosmicSectionComponent {
  layer = computed(() => cosmicLayer());
}