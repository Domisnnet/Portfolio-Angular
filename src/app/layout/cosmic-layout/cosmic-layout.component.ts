import { Component, computed, signal } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '../../components/header/header.component';
import { MainFooterComponent } from '../../components/footer/main-footer/main-footer.component';
import { TerminalFooterComponent } from '../../components/footer/terminal-footer/terminal-footer.component';

export type CosmicMode = 'silent' | 'minimal' | 'full';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    MainFooterComponent,
    TerminalFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss']
})
export class CosmicLayoutComponent {
  private _mode = signal<CosmicMode>('full');

  mode = computed(() => this._mode());

  routeName = computed(() => this.router.url);

  showMainFooter = computed(() => {
    return this._mode() !== 'silent';
  });

  showTerminal = computed(() => {
    return this._mode() !== 'full';
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.listenRouteChanges();
  }

  private listenRouteChanges() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let currentRoute = this.route.firstChild;

        while (currentRoute?.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        const cosmic: CosmicMode =
          (currentRoute?.snapshot.data?.['cosmic'] as CosmicMode) ?? 'full';

        this._mode.set(cosmic);
      });
  }
}