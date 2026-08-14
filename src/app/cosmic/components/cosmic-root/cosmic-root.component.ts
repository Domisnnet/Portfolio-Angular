import { Component } from '@angular/core';
import { CosmicBeamComponent } from '@app/cosmic/components/cosmic-beam/cosmic-beam.component';
import { CosmicGridComponent } from '@app/cosmic/components/cosmic-grid/cosmic-grid.component';
import { CosmicNebulaComponent } from '@app/cosmic/components/cosmic-nebula/cosmic-nebula.component';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { LayerIndicatorComponent } from '@app/cosmic/components/layer-indicator/layer-indicator.component';
import { LayerJumpComponent } from '@app/cosmic/components/layer-jump/layer-jump.component';
import { MeteorFieldComponent } from '@app/cosmic/components/meteor-field/meteor-field.component';
import { SecretStarComponent } from '@app/cosmic/components/secret-star/secret-star.component';
import { WormholeComponent } from '@app/cosmic/components/wormhole/wormhole.component';

@Component({
  selector: 'app-cosmic-root',
  standalone: true,
  imports: [
    CosmicBeamComponent,
    CosmicGridComponent,
    CosmicNebulaComponent,
    CosmicStarsComponent,
    LayerIndicatorComponent,
    LayerJumpComponent,
    SecretStarComponent,
    MeteorFieldComponent,
    WormholeComponent
  ],
  templateUrl: './cosmic-root.component.html',
  styleUrls: ['./cosmic-root.component.scss'],
})
export class CosmicRootComponent {}
