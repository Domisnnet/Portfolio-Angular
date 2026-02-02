import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HeaderMode, HeaderComponent } from '../../components/header/header.component';
import { MainFooterComponent } from "@app/components/footer/main-footer/main-footer.component";

@Component({
  selector: 'app-cosmic-layout',
  imports: [
    HeaderComponent, 
    RouterOutlet, 
    MainFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss'],
})
export class CosmicLayoutComponent {

  private _mode = signal<HeaderMode>('full');

  constructor(route: ActivatedRoute) {
    route.firstChild?.data.subscribe(data => {
      this._mode.set(data['cosmic'] ?? 'full');
    });
  }

  mode() {
    return this._mode();
  }
}