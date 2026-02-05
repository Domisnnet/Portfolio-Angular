import { Injectable, signal, effect } from '@angular/core';

/* =========================
  TYPES
========================= */
export type CosmicEffectsMode =
  | 'full'
  | 'minimal'
  | 'silent';
/* =========================
  CONSTANTS
========================= */
const STORAGE_KEY = 'cosmic-effects-mode';
const DEFAULT_MODE: CosmicEffectsMode = 'full';
const ORDER: CosmicEffectsMode[] = [
  'full',
  'minimal',
  'silent'
];
/* =========================
  SERVICE
========================= */
@Injectable({
  providedIn: 'root'
})
export class CosmicEffectsService {
  /* -------------------------
    STATE
  ------------------------- */
  private readonly _mode = signal<CosmicEffectsMode>( this.loadInitialMode());
  readonly mode = this._mode.asReadonly();
  /* -------------------------
    SIDE EFFECTS
  ------------------------- */
  constructor() {
    effect(() => {
      const mode = this._mode();
      document.documentElement.setAttribute( 'data-effects', mode );
      localStorage.setItem(STORAGE_KEY, mode);
    });
  }
  /* -------------------------
    PUBLIC API
  ------------------------- */
  set(mode: CosmicEffectsMode) {
    this._mode.set(mode);
  }
  cycle() {
    const current = this._mode();
    const index = ORDER.indexOf(current);
    const next = ORDER[(index + 1) % ORDER.length];

    this._mode.set(next);

  }
  /* -------------------------
    HELPERS
  ------------------------- */
  isFull() {
    return this._mode() === 'full';
  }
  isMinimal() {
    return this._mode() === 'minimal';
  }
  isSilent() {
    return this._mode() === 'silent';
  }
  /* -------------------------
    INITIAL LOAD
  ------------------------- */
  private loadInitialMode(): CosmicEffectsMode {
    try {

      const saved = localStorage.getItem(
        STORAGE_KEY
      ) as CosmicEffectsMode | null;

      if (saved && ORDER.includes(saved)) {
        return saved;
      }

    } catch {
    }

    return DEFAULT_MODE;
  }
}