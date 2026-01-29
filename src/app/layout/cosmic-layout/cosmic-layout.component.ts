import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


export type CosmicMode = 'full' | 'minimal' | 'silent';

@Component({
  selector: 'app-cosmic-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cosmic-layout.component.html',
  styleUrls: ['./cosmic-layout.component.scss']
})
export class CosmicLayoutComponent {
  mode: CosmicMode = 'full';
}