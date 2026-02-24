import { Component, inject } from '@angular/core';
import { filter } from 'rxjs/operators';
import { RouterOutlet, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CosmicEffectsService } from '@app/core/services/cosmic-effects.service';
import { HeaderComponent } from '@app/components/header/header.component';
import { MainFooterComponent } from '@app/components/footer/main-footer/main-footer.component';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { TerminalFooterComponent } from '@app/components/footer/terminal-footer/terminal-footer.component';

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
  constructor(route: ActivatedRoute) {
    route.firstChild?.data.subscribe(data => {
      const mode = data['cosmic'];
      if (mode) this.cosmic.set(mode);
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => { this.updateRouteLabel(); });
  }
  private updateRouteLabel() {
    const url = this.router.url;
    if (url.includes('about')) this.routeLabel = 'ABOUT VECTOR';
    else if (url.includes('stack')) this.routeLabel = 'STACK ONLINE';
    else if (url.includes('architecture')) this.routeLabel = 'ARCH GRID';
    else if (url.includes('performance')) this.routeLabel = 'PERFORMANCE OPTIMAL';
    else if (url.includes('access')) this.routeLabel = 'ACCESS READY';
    else if (url.includes('laboratory')) this.routeLabel = 'LAB ACTIVE';
    else if (url.includes('future')) this.routeLabel = 'FUTURE SIGNAL';
    else this.routeLabel = 'ORBIT STABLE';
  }
}