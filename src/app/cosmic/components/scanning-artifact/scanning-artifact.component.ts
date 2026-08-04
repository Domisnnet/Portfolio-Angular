import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-scanning-artifact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scanning-artifact.component.html',
  styleUrls: ['./scanning-artifact.component.scss'],
})
export class ScanningArtifactComponent {
  constructor(
    public readonly cosmic: CosmicLayerService,
  ) {}
}