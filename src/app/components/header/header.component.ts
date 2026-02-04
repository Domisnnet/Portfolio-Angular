import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@app/core/theme-toggle.component';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer-service';

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

  private cosmicLayer = inject(CosmicLayerService);

  menuOpen = signal(false);

  isSilent = this.cosmicLayer.isSilent;

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  toggleCosmicEffects() {
    this.cosmicLayer.toggleSilent();
  }
}