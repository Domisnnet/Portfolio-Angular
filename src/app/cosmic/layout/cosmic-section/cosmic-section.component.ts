import { Component, computed } from '@angular/core';
import { cosmicLayer } from '../../state/cosmic-layer-signal';

@Component({
  selector: 'app-cosmic-section',
  templateUrl: './cosmic-section.component.html',
  styleUrls: ['./cosmic-section.component.scss']
})
export class CosmicSectionComponent {
  layer = computed(() => cosmicLayer());
}