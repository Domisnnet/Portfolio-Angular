import { Component } from '@angular/core';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { CosmicNebulaComponent } from '@app/cosmic/components/cosmic-nebula/cosmic-nebula.component';
import { CosmicGridComponent } from '@app/cosmic/components/cosmic-grid/cosmic-grid.component';
import { CosmicBeamComponent } from '@app/cosmic/components/cosmic-beam/cosmic-beam.component';
import { LayerJumpComponent } from '@app/cosmic/components/layer-jump/layer-jump.component';
import { LayerIndicatorComponent } from '../layer-indicator/layer-indicator.component';
import { WormholeComponent } from '../wormhole/wormhole.component';

@Component({
  selector: 'app-cosmic-root',
  standalone: true,
  imports: [
    CosmicStarsComponent,
    CosmicNebulaComponent,
    CosmicGridComponent,
    CosmicBeamComponent,
    LayerJumpComponent,
    LayerIndicatorComponent,
    WormholeComponent
  ],
  templateUrl: './cosmic-root.component.html',
  styleUrls: ['./cosmic-root.component.scss'],
})
export class CosmicRootComponent {}