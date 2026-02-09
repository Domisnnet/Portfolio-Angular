import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-init',
  standalone: true,
  template: ''
})
export class ThemeInitComponent {
  constructor() {
    inject(ThemeService).init();
    document.documentElement.setAttribute(
      'data-cosmic-effects',
      'full'
    );    
  }
}