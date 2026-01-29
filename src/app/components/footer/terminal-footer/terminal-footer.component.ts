import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmicMode } from '../../../layout/cosmic-layout/cosmic-mode.type';

@Component({
  selector: 'app-terminal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-footer.component.html',
  styleUrls: ['./terminal-footer.component.scss']
})
export class TerminalFooterComponent implements OnChanges, OnDestroy {

  @Input() mode: CosmicMode = 'full';
  @Input() route = '';

  message = '';
  displayText = '';

  private typingTimeout?: number;
  private charIndex = 0;

  ngOnChanges() {
    this.prepareMessage();
  }

  ngOnDestroy() {
    window.clearTimeout(this.typingTimeout);
  }

  private prepareMessage() {
    const next = this.resolveMessage();

    // evita reanimar a mesma mensagem
    if (next === this.message) return;

    this.message = next;
    this.displayText = '';
    this.charIndex = 0;

    // pequeno delay antes de começar
    this.typingTimeout = window.setTimeout(() => {
      this.typeNextChar();
    }, this.mode === 'silent' ? 800 : 300);
  }

  private typeNextChar() {
    if (this.charIndex >= this.message.length) return;

    this.displayText += this.message[this.charIndex];
    this.charIndex++;

    this.typingTimeout = window.setTimeout(
      () => this.typeNextChar(),
      this.mode === 'silent' ? 80 : 45
    );
  }

  private resolveMessage(): string {
    if (this.mode === 'silent') {
      return '> PASSIVE MODE ENABLED';
    }

    if (this.mode === 'minimal') {
      return '> OPENING COMMS CHANNEL...';
    }

    switch (this.route) {
      case '':
        return '> INITIALIZING CORE SYSTEMS...';
      case 'projects':
        return '> INDEXING PROJECTS...';
      default:
        return '> SCANNING ARCHIVES...';
    }
  }
}