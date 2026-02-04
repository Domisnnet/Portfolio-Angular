import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './cosmic-toggle.component.html',
  styleUrls: ['./cosmic-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosmicToggleComponent {
  private themeService = inject(ThemeService);

  readonly isDark = computed(
    () => this.themeService.theme() === 'cosmic'
  );

  toggle(): void {
    this.themeService.toggleTheme();
  }
}