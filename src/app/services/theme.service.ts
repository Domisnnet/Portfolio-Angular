import { Injectable, signal } from '@angular/core';

export type Theme = 'cosmic' | 'solar';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'theme';
  constructor() {
    this.init();
  }
  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY) ?? 'cosmic';
    this.apply(saved);
  }
  apply(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
  }
  toggle() {
    const current =
      document.documentElement.getAttribute('data-theme') ?? 'cosmic';
    const next = current === 'cosmic' ? 'solar' : 'cosmic';
    this.apply(next);
    localStorage.setItem(this.STORAGE_KEY, next);
  }
}