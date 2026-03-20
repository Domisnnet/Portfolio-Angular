import { Component } from '@angular/core';
import { ScanningArtifactComponent } from '../scanning-artifact/scanning-artifact.component';
import { CosmicStarsComponent } from '@app/cosmic/components/cosmic-stars/cosmic-stars.component';
import { CosmicNebulaComponent } from '@app/cosmic/components/cosmic-nebula/cosmic-nebula.component';
import { CosmicGridComponent } from '@app/cosmic/components/cosmic-grid/cosmic-grid.component';
import { CosmicBeamComponent } from '@app/cosmic/components/cosmic-beam/cosmic-beam.component';

@Component({
  selector: 'app-cosmic-root',
  standalone: true,
  imports: [
    ScanningArtifactComponent,
    CosmicStarsComponent,
    CosmicNebulaComponent,
    CosmicGridComponent,
    CosmicBeamComponent,
  ],
  templateUrl: './cosmic-root.component.html',
  styleUrls: ['./cosmic-root.component.scss'],
})
export class CosmicRootComponent {}