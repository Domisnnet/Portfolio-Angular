import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  /* API */
  @Input() variant: 'solid' | 'outline' | 'ghost' = 'solid';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  /* Navegação */
  @Input() href?: string;
  @Input() target?: string;
  @Input() rel?: string;
  @Input() routerLink?: string | any[];

  /* HOST BINDINGS */
  @HostBinding('class.full-width')
  get isFullWidth() {
    return this.fullWidth;
  }

  get isExternalLink(): boolean {
    return !!this.href;
  }

  get isRouterLink(): boolean {
    return !!this.routerLink;
  }

  get isButton(): boolean {
    return !this.href && !this.routerLink;
  }

  get computedRel(): string | null {
    if (!this.target || this.target !== '_blank') return this.rel ?? null;
    return this.rel ?? 'noopener noreferrer';
  }
}