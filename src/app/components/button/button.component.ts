import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

  @Input() variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() fullWidth = false;

  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;

  @Input() href?: string;
  @Input() target?: string;
  @Input() rel?: string;
  @Input() routerLink?: string | any[];

  get mode(): 'external' | 'router' | 'button' {
    if (this.href) return 'external';
    if (this.routerLink) return 'router';
    return 'button';
  }

  get computedRel(): string | null {
    if (this.target === '_blank') {
      return this.rel ?? 'noopener noreferrer';
    }
    return this.rel ?? null;
  }
}