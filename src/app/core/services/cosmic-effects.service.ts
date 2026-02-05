import { Injectable, signal, effect, inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CosmicEffectsMode = 'full' | 'minimal' | 'silent';

@Injectable({ providedIn: 'root' })
export class CosmicEffectsService {
  private readonly storageKey = 'cosmic-effects';
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
    
      this.renderer.setAttribute(
        document.documentElement,
        'data-cosmic-effects',
        this.mode()
      );
    });    
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
  set(mode: CosmicEffectsMode): void {
    this.mode.set(mode);
  }
  isFull(): boolean {
    return this.mode() === 'full';
  }
  isMinimal(): boolean {
    return this.mode() === 'minimal';
  }
  isSilent(): boolean {
    return this.mode() === 'silent';
  }
  private getInitialMode(): CosmicEffectsMode {
    const stored = localStorage.getItem(this.storageKey) as CosmicEffectsMode | null;
    return stored === 'full' || stored === 'minimal' || stored === 'silent'
      ? stored
      : 'full';
  }
}