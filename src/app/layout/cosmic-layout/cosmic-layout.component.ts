import { Component, inject } from '@angular/core';
import { CosmicEffectsService } from '@app/cosmic/state/cosmic-effects.service';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss'],
})
export class CosmicLayoutComponent {
  cosmic = inject(CosmicEffectsService);
}