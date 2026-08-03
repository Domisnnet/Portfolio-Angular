import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@app/components/button/button.component';
import { ThemeToggleComponent } from '@app/core/theme-toggle/theme-toggle.component';
import { CosmicEffectsService } from '@app/core/services/cosmic-effects.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, RouterLink, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private effects: CosmicEffectsService) {}
  menuOpen = signal(false);
  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
  toggleCosmicEffects() {
    this.effects.cycle();
  }
  isSilent = computed(() => this.effects.isSilent());
}
