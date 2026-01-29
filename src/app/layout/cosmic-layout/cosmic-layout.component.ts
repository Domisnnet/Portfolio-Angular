import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

export type CosmicMode = 'full' | 'minimal' | 'silent';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss']
})
export class CosmicLayoutComponent {
  mode: CosmicMode = 'full';

  constructor(private route: ActivatedRoute) {
    this.route.firstChild?.data.subscribe(data => {
      this.mode = data['cosmic'] ?? 'full';
    });
  }
}