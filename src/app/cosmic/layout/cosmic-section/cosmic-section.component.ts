import { Component, inject } from '@angular/core';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';
import { ScanningArtifactComponent } from '@app/cosmic/components/scanning-artifact/scanning-artifact.component';
import { CosmicNebulaComponent } from '@app/cosmic/components/cosmic-nebula/cosmic-nebula.component';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { CosmicBeamComponent } from '@app/cosmic/components/cosmic-beam/cosmic-beam.component';
import { CosmicGridComponent } from '@app/cosmic/components/cosmic-grid/cosmic-grid.component';
import { WormholeComponent } from '@app/cosmic/components/wormhole/wormhole.component';
import { LayerIndicatorComponent } from '@app/cosmic/components/layer-indicator/layer-indicator.component';
import { LayerJumpComponent } from '@app/cosmic/components/layer-jump/layer-jump.component';


@Component({
  selector: 'app-cosmic-section',
  standalone: true,
  imports: [
    ScanningArtifactComponent,
    CosmicNebulaComponent,
    CosmicStarsComponent,
    CosmicBeamComponent,
    CosmicGridComponent,
    WormholeComponent,
    LayerIndicatorComponent,
    LayerJumpComponent
  ],
  templateUrl: './cosmic-section.component.html',
  styleUrls: ['./cosmic-section.component.scss'],
})
export class CosmicSectionComponent {
  cosmicLayer = inject(CosmicLayerService);
}