import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COSMIC_LABELS } from '@app/cosmic/config/cosmic-labels.config';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

@Component({
  selector: 'app-scanning-artifact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scanning-artifact.component.html',
  styleUrls: ['./scanning-artifact.component.scss'],
})
export class ScanningArtifactComponent {
  readonly labels = COSMIC_LABELS;
  constructor(protected readonly cosmic: CosmicLayerService) {}
}
