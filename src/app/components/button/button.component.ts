import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() fullWidth = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href?: string;
  @Input() routerLink?: string | any[];
  @Input() target?: string;
  @Input() rel?: string;
  @Input() ariaLabel?: string;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;
  @Input() text = '';
  @HostBinding('class.full-width-host') get hostFullWidth(): boolean { return this.fullWidth; }
  
  get isLink(): boolean {
    return !!this.href;
  }

  get isRouterLink(): boolean {
    return !this.href && !!this.routerLink;
  }

  get computedRel(): string | null {
    if (this.target === '_blank') {
      return this.rel ?? 'noopener noreferrer';
    }
    return this.rel ?? null;
  }

  get buttonClasses(): string[] {
    return [
      this.variant,
      this.size,
      this.fullWidth ? 'full-width' : '',
      this.loading ? 'loading' : ''
    ];
  }
}