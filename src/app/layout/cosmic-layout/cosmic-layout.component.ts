import { Component, inject } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { CosmicEffectsService } from '@app/core/services/cosmic-effects.service';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [RouterOutlet],
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