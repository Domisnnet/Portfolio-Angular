import { Injectable, signal } from '@angular/core';

export type Theme = 'cosmic' | 'solar';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  readonly theme = signal<Theme>('cosmic');
  readonly isDark = () => this.theme() === 'cosmic';
  constructor() {
    this.init();
  }

  init() {
    const saved = (localStorage.getItem(this.STORAGE_KEY) as Theme) ?? 'cosmic';
    this.apply(saved);
  }

  apply(theme: Theme) {
    this.theme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  toggle() {
    const next = this.theme() === 'cosmic' ? 'solar' : 'cosmic';
    this.apply(next);
  }
}
