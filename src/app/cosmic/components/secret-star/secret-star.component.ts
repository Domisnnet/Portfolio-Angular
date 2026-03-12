import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-layer.service';

type StarState =
  | 'idle'
  | 'awakening'
  | 'unstable';

@Component({
  selector: 'app-secret-star',
  standalone: true,
  templateUrl: './secret-star.component.html',
  styleUrls: ['./secret-star.component.scss'],
})
export class SecretStarComponent implements OnInit {
  private router = inject(Router);
  private cosmicLayer = inject(CosmicLayerService);
  starState: StarState = 'idle';
  private clicks = 0;
  private resetTimer?: number;

  ngOnInit(): void {
    /* estado inicial obrigatório */
    this.cosmicLayer.set('projects');
  }

  handleClick(): void {
    this.clicks++;
    if (this.clicks === 1) {
      this.starState = 'awakening';
      this.cosmicLayer.set('stable-orbit');
    }

    if (this.clicks === 2) {
      this.starState = 'unstable';
      this.cosmicLayer.set('unstable-orbit');
    }

    if (this.clicks === 3) { 
      this.activateWormhole(); return; 
    } this.resetClicks();
  }

  private resetClicks(): void {
    clearTimeout(this.resetTimer);
    const delayValue = getComputedStyle(document.documentElement) .getPropertyValue('--secret-star-click-reset');
    const delay = parseFloat(delayValue) || 2000;
    this.resetTimer = window.setTimeout(() => { this.clicks = 0; this.starState = 'idle'; this.cosmicLayer.set('projects'); }, delay);
  }

  private activateWormhole(): void {
    const delayValue = getComputedStyle(document.documentElement) .getPropertyValue('--secret-wormhole-delay');
    const delay = parseFloat(delayValue) || 1200;
    this.cosmicLayer.set('wormhole');
    setTimeout(() => { this.router.navigate(['/wormhole']); }, delay);
  }
}