import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../../core/theme-toggle.component';

export type HeaderMode = 'full' | 'minimal' | 'silent';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule, 
    ThemeToggleComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  mode = input.required<HeaderMode>();

  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  isFull() {
    return this.mode() === 'full';
  }

  isMinimal() {
    return this.mode() === 'minimal';
  }

  isSilent() {
    return this.mode() === 'silent';
  }
}