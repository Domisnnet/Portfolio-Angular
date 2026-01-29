import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CosmicMode } from './cosmic-mode.type';
import { HeaderComponent } from '../../components/header/header.component';
import { TerminalFooterComponent } from '../../components/footer/terminal-footer/terminal-footer.component';
import { MainFooterComponent } from '../../components/footer/main-footer/main-footer.component';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    TerminalFooterComponent,
    MainFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss']
})
export class CosmicLayoutComponent {

  private modeSignal = signal<CosmicMode>('full');
  private routeSignal = signal<string>('');

  mode = computed(() => this.modeSignal());
  routeName = computed(() => this.routeSignal());

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.route.firstChild;
        const cosmic = child?.snapshot.data['cosmic'] as CosmicMode | undefined;
        this.modeSignal.set(cosmic ?? 'full');

        const path = child?.snapshot.routeConfig?.path ?? '';
        this.routeSignal.set(path);
      });
  }

  showMainFooter(): boolean {
    return this.mode() === 'full';
  }
}