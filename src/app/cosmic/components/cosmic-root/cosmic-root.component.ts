import { Component } from '@angular/core';
import { CosmicStarsComponent } from '../cosmic-stars/cosmic-stars.component';
import { CosmicGridComponent } from '../cosmic-grid/cosmic-grid.component';
import { CosmicBeamComponent } from '../cosmic-beam/cosmic-beam.component';


@Component({
  selector: 'app-cosmic-root',
  standalone: true,
  imports: [
    CosmicStarsComponent,
    CosmicGridComponent,
    CosmicBeamComponent,
  ],
  templateUrl: './cosmic-root.component.html',
  styleUrls: ['./cosmic-root.component.scss'],
})
export class CosmicRootComponent {}