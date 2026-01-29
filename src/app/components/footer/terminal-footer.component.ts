import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-terminal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-footer.component.html',
  styleUrls: ['./terminal-footer.component.scss']
})
export class TerminalFooterComponent {
  status = 'SYSTEM ONLINE';
  routeLabel = 'ORBIT STABLE';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.updateStatus((event as NavigationEnd).urlAfterRedirects);
      });
  }

  private updateStatus(url: string) {
    if (url.includes('projects')) {
      this.routeLabel = 'SCANNING SECTORS';
    } else if (url.includes('contact')) {
      this.routeLabel = 'OPEN CHANNEL';
    } else {
      this.routeLabel = 'ORBIT STABLE';
    }
  }
}