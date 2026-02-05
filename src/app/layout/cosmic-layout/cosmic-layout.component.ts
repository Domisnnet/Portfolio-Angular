import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/components/header/header.component';
import { MainFooterComponent } from "@app/components/footer/main-footer/main-footer.component";
import { CosmicMode } from './cosmic-mode-type';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [
    HeaderComponent, 
    RouterOutlet, 
    MainFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss'],
})
export class CosmicLayoutComponent {

  private _mode = signal<CosmicMode>('full');

  constructor(route: ActivatedRoute) {
    route.firstChild?.data.subscribe(data => {
      this._mode.set(data['cosmic'] ?? 'full');
    });
  }

  mode() {
    return this._mode();
  }
}