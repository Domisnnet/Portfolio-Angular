import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@app/core/theme-toggle.component';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer-service';
import { CosmicEffectsService } from '@app/cosmic/state/cosmic-effects.service';
import { computed } from '@angular/core';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    ThemeToggleComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private effects: CosmicEffectsService) {}

  toggleCosmicEffects() {
    this.effects.cycle();
}
  isSilent = computed(() => this.effects.isSilent());
}