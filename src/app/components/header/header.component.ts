import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../../core/theme-toggle.component';

type HeaderMode = 'full' | 'minimal' | 'silent';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    ThemeToggleComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
})
export class HeaderComponent {

  private mode = signal<HeaderMode>('full');
  isVisible = () => this.mode() !== 'silent';
  isFull = () => this.mode() === 'full';
  isMinimal = () => this.mode() === 'minimal';
  isSilent = () => this.mode() === 'silent';

  setMode(mode: HeaderMode) {
    this.mode.set(mode);
  }

  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }
}