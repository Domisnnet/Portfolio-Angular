import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-terminal-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal-footer.component.html',
  styleUrls: ['./terminal-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminalFooterComponent implements OnChanges {
  @Input() message = '> CORE SYSTEMS ONLINE';
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