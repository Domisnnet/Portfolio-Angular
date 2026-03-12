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
  private cosmic = inject(CosmicLayerService);
  starState: StarState = 'idle';
  ngOnInit(): void {
    this.cosmic.set('projects');
  }

  handleClick(): void {
    const clicks = this.cosmic.registerClick();
    if (clicks === 1) {
      this.starState = 'awakening';
    }

    if (clicks === 2) {
      this.starState = 'unstable';
    }

    if (clicks === 3) {
      this.activateWormhole();
    }
  }

  private activateWormhole(): void {
    const delayValue = getComputedStyle(document.documentElement)
      .getPropertyValue('--secret-wormhole-delay');
    const delay = parseFloat(delayValue) || 1200;
    this.cosmic.activateWormhole();

    setTimeout(() => {
      this.router.navigate(['/wormhole']);
    }, delay);
  }
}