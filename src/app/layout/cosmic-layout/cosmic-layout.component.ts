import { Component, inject } from '@angular/core';
import { filter } from 'rxjs/operators';
import { RouterOutlet, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CosmicEffectsService } from '@app/core/services/cosmic-effects.service';
import { HeaderComponent } from '@app/components/header/header.component';
import { MainFooterComponent } from '@app/components/footer/main-footer/main-footer.component';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { TerminalFooterComponent } from '@app/components/footer/terminal-footer/terminal-footer.component';

type TerminalTone =
  | 'neon'
  | 'system'
  | 'signal'
  | 'success'
  | 'warning';

interface TerminalState {
  label: string;
  tone: TerminalTone;
}

const ROUTE_TERMINAL_MAP: Record<string, TerminalState> = {
  home:         { label: 'ORBIT STABLE', tone: 'system' },
  projects:     { label: 'PROJECTS LOADED', tone: 'neon' },
  contact:      { label: 'CONTACT CHANNEL READY', tone: 'neon' },

  about:        { label: 'VECTOR 386 ENGAGED', tone: 'neon' },
  background:   { label: 'ORIGIN TRACE LOADED', tone: 'neon' },
  ano2024:      { label: 'TIMELINE NODE 2024', tone: 'signal' },
  domisdev:     { label: 'IDENTITY SIGNATURE VERIFIED', tone: 'signal' },

  stack:        { label: 'STACK VECTOR LOADED', tone: 'system' },
  architecture: { label: 'ARCH GRID STABILIZED', tone: 'system' },
  performance:  { label: 'PERFORMANCE OPTIMAL', tone: 'success' },
  access:       { label: 'ACCESS PROTOCOL ACTIVE', tone: 'success' },

  future:       { label: 'FUTURE SIGNAL DETECTED', tone: 'signal' },
  laboratory:   { label: 'LAB ENVIRONMENT ACTIVE', tone: 'signal' },
  system:       { label: 'CORE SYSTEM SYNCHRONIZED', tone: 'system' },
  signal:       { label: 'DEEP SIGNAL LOCKED', tone: 'neon' }
};

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainFooterComponent,
    CosmicStarsComponent,
    TerminalFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss'],
})
export class CosmicLayoutComponent {
  private cosmic = inject(CosmicEffectsService);
  private router = inject(Router);
  routeLabel = 'ORBIT STABLE';
  tone: TerminalTone = 'system';

  constructor(private route: ActivatedRoute) {
    this.route.firstChild?.data.subscribe(data => {
      const mode = data['cosmic'];
      if (mode) this.cosmic.set(mode);
    });
    this.updateRouteLabel();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateRouteLabel());
  }

  private updateRouteLabel(): void {
    const primarySegment = this.router.url
      .toLowerCase()
      .split('?')[0]
      .split('#')[0]
      .split('/')
      .filter(Boolean)[0] || 'home';
    const state = ROUTE_TERMINAL_MAP[primarySegment];
    if (state) {
      this.routeLabel = state.label;
      this.tone = state.tone;
    } else {
      this.routeLabel = 'ORBIT STABLE';
      this.tone = 'system';
    }
    // debug opcional
    // console.log('[terminal]', primarySegment, this.routeLabel, this.tone);
  }
}