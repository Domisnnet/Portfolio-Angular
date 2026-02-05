import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@app/core/theme-toggle/theme-toggle.component';
import { CosmicEffectsService } from '@app/cosmic/state/cosmic-effects.service';
import { CosmicToggleComponent } from '@app/core/cosmic-toggle/cosmic-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    ThemeToggleComponent,
    CosmicToggleComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /* =========================
    SERVICES
  ========================= */
  constructor(private effects: CosmicEffectsService) {}
  /* =========================
    MENU MOBILE
  ========================= */
  menuOpen = signal(false);
  toggleMenu() {
    this.menuOpen.update(v => !v);
  }
  /* =========================
    COSMIC EFFECTS
  ========================= */
  toggleCosmicEffects() {
    this.effects.cycle();
  }
  isSilent = computed(() =>
    this.effects.isSilent()
  );
}