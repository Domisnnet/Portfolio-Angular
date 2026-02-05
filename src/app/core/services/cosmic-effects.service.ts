import {
  Injectable,
  signal,
  effect,
  inject,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
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
      this.mode.set(this.getInitialMode());
    }
    effect(() => {
      if (!this.isBrowser) return;
      const mode = this.mode();
      this.renderer.setAttribute(
        document.documentElement,
        'data-cosmic-effects',
        mode
      );
      localStorage.setItem(this.STORAGE_KEY, mode);
    });
  }
  set(mode: CosmicEffectsMode): void {
    this.mode.set(mode);
  }
  cycle(): void {
    this.mode.update(m =>
      m === 'full'
        ? 'minimal'
        : m === 'minimal'
        ? 'silent'
        : 'full'
    );
  }
  isFull() {
    return this.mode() === 'full';
  }
  isMinimal() {
    return this.mode() === 'minimal';
  }
  isSilent() {
    return this.mode() === 'silent';
  }
  private getInitialMode(): CosmicEffectsMode {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored === 'full' || stored === 'minimal' || stored === 'silent'
      ? stored
      : 'full';
  }
}