import { Component, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { CosmicEffectsService } from '@app/core/services/cosmic-effects.service';
import { HeaderComponent } from '@app/components/header/header.component';
import { MainFooterComponent } from '@app/components/footer/main-footer/main-footer.component';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MainFooterComponent
  ],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss'],
})
export class CosmicLayoutComponent {
  private cosmic = inject(CosmicEffectsService);
  constructor(route: ActivatedRoute) {
    route.firstChild?.data.subscribe(data => {
      const mode = data['cosmic'];
      if (mode) this.cosmic.set(mode);
    });
  }
}