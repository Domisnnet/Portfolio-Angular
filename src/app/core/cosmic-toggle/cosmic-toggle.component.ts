import { Component, inject } from '@angular/core';
import { CosmicEffectsService } from '@app/core/services/cosmic-effects.service';

@Component({
  selector: 'app-cosmic-toggle',
  standalone: true,
  templateUrl: './cosmic-toggle.component.html',
  styleUrls: ['./cosmic-toggle.component.scss'],
})
export class CosmicToggleComponent {
  private effects = inject(CosmicEffectsService);
  mode = this.effects.mode;
  toggle() {
    this.effects.cycle();
  }
}