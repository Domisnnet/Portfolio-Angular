import { Injectable } from '@angular/core';

export type Theme = 'cosmic' | 'solar';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly key = 'theme';

  init() {
    const saved = (localStorage.getItem(this.key) as Theme) ?? 'cosmic';
    this.apply(saved);
  }

  toggle() {
    const current = document.documentElement.dataset['theme'] as Theme;
    this.apply(current === 'solar' ? 'cosmic' : 'solar');
  }

  apply(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.key, theme);
  }
}