import { Component } from '@angular/core';
import { SecretStarComponent } from '@app/cosmic/components/secret-star/secret-star.component';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { CosmicNebulaComponent } from '@app/cosmic/components/cosmic-nebula/cosmic-nebula.component';
import { CosmicGridComponent } from '@app/cosmic/components/cosmic-grid/cosmic-grid.component';
import { CosmicBeamComponent } from '@app/cosmic/components/cosmic-beam/cosmic-beam.component';
import { LayerIndicatorComponent } from '@app/cosmic/components/layer-indicator/layer-indicator.component';
import { LayerJumpComponent } from '@app/cosmic/components/layer-jump/layer-jump.component';
import { WormholeComponent } from '@app/cosmic/components/wormhole/wormhole.component';

@Component({
  selector: 'app-cosmic-root',
  standalone: true,
  imports: [
    CosmicStarsComponent,
    SecretStarComponent,
    LayerIndicatorComponent,
    LayerJumpComponent,
    WormholeComponent,
    CosmicNebulaComponent,
    CosmicGridComponent,
    CosmicBeamComponent
  ],
  templateUrl: './cosmic-root.component.html',
  styleUrls: ['./cosmic-root.component.scss'],
})
export class CosmicRootComponent {}
