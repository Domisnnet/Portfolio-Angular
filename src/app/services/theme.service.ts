import { Injectable, signal } from '@angular/core';

export type Theme = 'cosmic' | 'solar';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'theme';

  private _theme = signal<Theme>('cosmic');
  readonly theme = this._theme.asReadonly();

  init() {
    const saved = (localStorage.getItem(this.key) as Theme) ?? 'cosmic';
    this.apply(saved);
  }

  toggleTheme() {
    this.apply(this._theme() === 'solar' ? 'cosmic' : 'solar');
  }

  apply(theme: Theme) {
    this._theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
  }
}