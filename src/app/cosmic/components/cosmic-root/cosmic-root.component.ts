import { Component } from '@angular/core';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { CosmicGridComponent } from '@app/cosmic/components/cosmic-grid/cosmic-grid.component';
import { CosmicBeamComponent } from '@app/cosmic/components/cosmic-beam/cosmic-beam.component';
import { LayerJumpComponent } from '@app/cosmic/components/layer-jump/layer-jump.component';

@Component({
  selector: 'app-cosmic-root',
  standalone: true,
  imports: [
    CosmicStarsComponent,
    CosmicGridComponent,
    CosmicBeamComponent,
    LayerJumpComponent
  ],
  templateUrl: './cosmic-root.component.html',
  styleUrls: ['./cosmic-root.component.scss'],
})
export class CosmicRootComponent {}