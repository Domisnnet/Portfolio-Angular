import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmicMode } from '../../../layout/cosmic-layout/cosmic-mode.type';

@Component({
  selector: 'app-terminal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-footer.component.html',
  styleUrls: ['./terminal-footer.component.scss']
})
export class TerminalFooterComponent implements OnChanges {

  @Input() mode: CosmicMode = 'full';

  message = '';

  ngOnChanges() {
    this.updateMessage();
  }

  private updateMessage() {
    switch (this.mode) {
      case 'full':
        this.message = '> SCANNING ARCHIVES...';
        break;
      case 'minimal':
        this.message = '> OPENING COMMS CHANNEL...';
        break;
      case 'silent':
        this.message = '> PASSIVE MODE ENABLED';
        break;
    }
  }
}