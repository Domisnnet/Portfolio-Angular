import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-init',
  template: '',
})
export class ThemeInitComponent {
  constructor() { inject(ThemeService); }
}