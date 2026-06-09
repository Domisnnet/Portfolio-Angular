import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
  @Input() ariaLabel?: string;
  @Input() iconLeft?: string;
  @Input() iconRight?: string;

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

  get hasOnlyIcon(): boolean {
    return !!(this.iconLeft && !this.iconRight && !this.getHasTextSlotHint);
  }

  get buttonAriaLabel(): string | null {
    return this.ariaLabel ?? null;
  }

  get getHasTextSlotHint(): boolean {
    return false;
  }
}