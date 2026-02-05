import { Component, computed } from '@angular/core';
import { CosmicEffectsService } from '@app/cosmic/state/cosmic-effects.service';

@Component({
  selector: 'app-cosmic-toggle',
  standalone: true,
  templateUrl: './cosmic-toggle.component.html',
  styleUrls: ['./cosmic-toggle.component.scss']
})
export class CosmicToggleComponent {
  constructor(private effects: CosmicEffectsService) {}
  mode = computed(() => this.effects.mode());
  toggle() {
    this.effects.cycle();
  }
}