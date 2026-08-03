import { Injectable, effect, signal } from '@angular/core';
import { cosmicLayerSignal } from '@app/cosmic/state/cosmic-layer.signal';
import { CosmicLayer, JumpStage } from '@app/cosmic/state/cosmic-layer.types';

@Injectable({
  providedIn: 'root',
})
export class CosmicLayerService {
  readonly layer = cosmicLayerSignal.asReadonly();
  private readonly jumpStageSignal = signal<JumpStage>('idle');
  readonly jumpStage = this.jumpStageSignal.asReadonly();
  private readonly jumpProgressSignal = signal(0);
  readonly jumpProgress = this.jumpProgressSignal.asReadonly();
  constructor() {
    effect(() => {
      document.documentElement.setAttribute('data-layer', this.layer());
      document.documentElement.setAttribute('data-stage', this.jumpStage());
      document.documentElement.setAttribute('data-jump-progress', String(this.jumpProgress()));
    });
  }
  advance(): JumpStage {
    const progress = Math.min(this.jumpProgress() + 1, 3);
    this.jumpProgressSignal.set(progress);
    switch (progress) {
      case 1: this.jumpStageSignal.set('charging'); break;
      case 2: this.jumpStageSignal.set('critical'); break;
      case 3: this.jumpStageSignal.set('wormhole'); cosmicLayerSignal.set('wormhole'); break;
    } return this.jumpStage();
  }
  finishJump(): void {
    cosmicLayerSignal.set('deep-space');
    this.jumpStageSignal.set('idle');
    this.jumpProgressSignal.set(0);
  }
  reset(): void {
    cosmicLayerSignal.set('projects');
    this.jumpStageSignal.set('idle');
    this.jumpProgressSignal.set(0); 
  }
  set(layer: CosmicLayer): void { cosmicLayerSignal.set(layer); }
  is(layer: CosmicLayer): boolean { return this.layer() === layer; }
  isStage(stage: JumpStage): boolean { return this.jumpStage() === stage; }
  isProjects(): boolean { return this.is('projects'); }
  isWormhole(): boolean { return this.is('wormhole'); }
  isDeepSpace(): boolean { return this.is('deep-space'); }
  isIdle(): boolean { return this.isStage('idle'); }
  isCharging(): boolean { return this.isStage('charging'); }
  isCritical(): boolean { return this.isStage('critical'); }
  isJumping(): boolean { return this.isStage('wormhole'); }
}