import { Injectable, signal, effect, PLATFORM_ID, inject, Renderer2, RendererFactory2, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'cosmic' | 'solar';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';
  private platformId = inject(PLATFORM_ID);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;
  private isBrowser = isPlatformBrowser(this.platformId);
  readonly theme = signal<Theme>('cosmic');
  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    if (this.isBrowser) {
      this.theme.set(this.getInitialTheme());
    }
    
    effect(() => {
      if (!this.isBrowser) return;
      const theme = this.theme();
      this.renderer.setAttribute( document.documentElement, 'data-theme', theme );
      localStorage.setItem(this.storageKey, theme);
    });
  }

  toggleTheme(): void { this.theme.update(t => (t === 'cosmic' ? 'solar' : 'cosmic')); }
  isCosmic(): boolean { return this.theme() === 'cosmic'; }
  isSolar(): boolean { return this.theme() === 'solar'; }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    return stored === 'cosmic' || stored === 'solar' ? stored : 'cosmic';
  }
}