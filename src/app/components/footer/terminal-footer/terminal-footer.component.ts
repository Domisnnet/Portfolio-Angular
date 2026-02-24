import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TerminalTone =
  | 'neon'
  | 'system'
  | 'signal'
  | 'success'
  | 'warning';

@Component({
  selector: 'app-terminal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-footer.component.html',
  styleUrls: ['./terminal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalFooterComponent implements OnChanges {
  @Input() message!: string;
  @Input() tone: 'neon' | 'system' | 'warning' | 'signal' | 'success' = 'system';
  displayText = '';
  isActive = false;
  ngOnChanges(): void {
    this.displayText = this.message;
    this.triggerSignal();
  }
  private triggerSignal(): void {
    this.isActive = true;
    setTimeout(() => (this.isActive = false), 600);
  }
}