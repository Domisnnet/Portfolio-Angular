import {
  Injectable,
  signal,
  effect,
  inject,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CosmicEffectsMode = 'full' | 'minimal' | 'silent';

@Injectable({ providedIn: 'root' })
export class CosmicEffectsService {
  private readonly STORAGE_KEY = 'cosmic-effects';
  private platformId = inject(PLATFORM_ID);
  private rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;
  private isBrowser = isPlatformBrowser(this.platformId);
  readonly mode = signal<CosmicEffectsMode>('full');
  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    if (this.isBrowser) {
      const saved = localStorage.getItem(this.STORAGE_KEY) as CosmicEffectsMode;
      this.mode.set(saved ?? 'full');
    }
    effect(() => {
      if (!this.isBrowser) return;
      const value = this.mode();
      this.renderer.setAttribute(
        document.documentElement,
        'data-cosmic-effects',
        value
      );
      localStorage.setItem(this.STORAGE_KEY, value);
    });
  }
  set(mode: CosmicEffectsMode) {
    this.mode.set(mode);
  }
  cycle() {
    this.mode.update(m =>
      m === 'full' ? 'minimal' : m === 'minimal' ? 'silent' : 'full'
    );
  }
  isSilent() {
    return this.mode() === 'silent';
  }
}