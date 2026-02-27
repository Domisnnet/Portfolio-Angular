import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TerminalFooterComponent } from '@app/components/footer/terminal-footer/terminal-footer.component';
import { LoaderComponent } from '@app/loader/loader.component';
import { LoaderService } from '@app/core/services/loader.service';
import { ThemeService } from '@app/core/services/theme.service'; 
import { CosmicRouteSyncService } from '@app/core/services/cosmic-route-sync.service';
import { ThemeInitComponent } from '@app/core/services/theme-init.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    TerminalFooterComponent,
    LoaderComponent,
    ThemeInitComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private loader = inject(LoaderService);
  private theme = inject(ThemeService); 
  private _cosmicSync = inject(CosmicRouteSyncService);
  loading$ = this.loader.loading$;
  constructor() {
    this.loader.show();
    setTimeout(() => { this.loader.hide(); }, 1200);
  }
}