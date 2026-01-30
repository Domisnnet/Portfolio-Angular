import { Component, signal, computed, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { MainFooterComponent } from '../../components/footer/main-footer/main-footer.component';
import { TerminalFooterComponent } from '../../components/footer/terminal-footer/terminal-footer.component';

export type LayoutMode = 'active' | 'passive';
export type CosmicMode = 'full' | 'minimal' | 'silent';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainFooterComponent,
    TerminalFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss'],
})

export class CosmicLayoutComponent {
mode(): import("./cosmic-mode.type").CosmicMode {
throw new Error('Method not implemented.');
}

  private router = inject(Router);

  readonly layoutMode = signal<LayoutMode>('active');
  readonly cosmicMode = computed<CosmicMode>(() => {
    return this.layoutMode() === 'active' ? 'full' : 'silent';
  });

  readonly routeName = computed(() => {
    const url = this.router.url;
    if (url === '/') return 'HOME';
    if (url.includes('projects')) return 'PROJECTS';
    if (url.includes('contact')) return 'CONTACT';
    return 'UNKNOWN';
  });

  showMainFooter(): boolean {
    return this.layoutMode() === 'active';
  }
}