import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TerminalFooterComponent } from './components/footer/terminal-footer/terminal-footer.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './core/services/loader.service';
import { ThemeService } from './core/services/theme.service'; 
import { ThemeInitComponent } from './core/services/theme-init.component';

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

  loading$ = this.loader.loading$;

  constructor() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();
    }, 1200);
  }
}