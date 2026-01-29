import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TerminalFooterComponent } from './components/footer/terminal-footer.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    TerminalFooterComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private loader = inject(LoaderService);
  loading$ = this.loader.loading$;

  constructor() {
    this.loader.show();
    setTimeout(() => {
      this.loader.hide();
    }, 1200);
  }
}