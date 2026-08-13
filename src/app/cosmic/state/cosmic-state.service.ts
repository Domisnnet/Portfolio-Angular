import { Injectable, computed, effect, signal } from '@angular/core';
import { COSMIC_REGIONS } from '@app/cosmic/config/cosmic-regions.config';
import { CosmicRegion } from '@app/cosmic/models/cosmic-region.model';
import { CosmicRegionId } from '@app/cosmic/enums/cosmic-status.enum';
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
  readonly region = computed<CosmicRegion>(() => {
    switch (this.layer()) {
      case 'projects': return COSMIC_REGIONS[CosmicRegionId.Featured];
      case 'deep-space': return COSMIC_REGIONS[CosmicRegionId.DeepSpace];
      case 'stable-orbit': return COSMIC_REGIONS[CosmicRegionId.StableOrbit];
      case 'unstable-orbit': return COSMIC_REGIONS[CosmicRegionId.UnstableOrbit];
      case 'wormhole': return COSMIC_REGIONS[CosmicRegionId.Featured];
      default: return COSMIC_REGIONS[CosmicRegionId.Featured];
    }
  });
  readonly regionName = computed(() => this.region().name);
  readonly distance = computed(() => this.region().distance);
  readonly projects = computed(() => this.region().projects);
  readonly diagnostic = computed(() => this.region().diagnostic);
  readonly totalProjects = computed(() => this.region().totalProjects);
  readonly signal = computed(() => this.region().signal);
  readonly energy = computed(() => this.region().energy);
  readonly status = computed(() => this.region().status);
  readonly scanMessage = computed(() => this.region().scanMessage);
  readonly progress = computed(() => Math.round((this.projects() / this.totalProjects()) * 100));
  constructor() {
    effect(() => {
      const html = document.documentElement;
      html.setAttribute('data-layer', this.layer());
      html.setAttribute('data-stage', this.jumpStage());
      html.setAttribute('data-jump-progress', String(this.jumpProgress()));
      html.setAttribute('data-region', this.region().id);
      html.setAttribute('data-status', this.status());
      html.setAttribute('data-signal', String(this.signal()));
    });
  }
  advance(): JumpStage {
    if (this.jumpStage() === 'wormhole') { return this.jumpStage(); }
    const progress = Math.min(this.jumpProgress() + 1, 3);
    this.jumpProgressSignal.set(progress);
    switch (progress) {
      case 1: this.jumpStageSignal.set('charging'); break;
      case 2: this.jumpStageSignal.set('critical'); break;
      case 3: this.jumpStageSignal.set('wormhole'); cosmicLayerSignal.set('wormhole'); break;
    } return this.jumpStage();
  }
  finishJump(): void { cosmicLayerSignal.set('deep-space'); this.jumpStageSignal.set('idle'); this.jumpProgressSignal.set(0); }
  reset(): void { cosmicLayerSignal.set('projects'); this.jumpStageSignal.set('idle'); this.jumpProgressSignal.set(0); }
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
