import { Component,ChangeDetectionStrategy,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { TerminalFooterComponent } from '../terminal-footer/terminal-footer.component';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    TerminalFooterComponent
  ],
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFooterComponent {
  private router = inject(Router);
  routeLabel = 'ORBIT STABLE';
  constructor() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe((e: NavigationEnd) => {
        this.routeLabel = this.resolveRouteLabel(e.urlAfterRedirects);
      });
  }
  private resolveRouteLabel(url: string): string {
    if (url.includes('projects')) return 'SCANNING SECTORS';
    if (url.includes('contact')) return 'OPEN CHANNEL';
    return 'ORBIT STABLE';
  }
}