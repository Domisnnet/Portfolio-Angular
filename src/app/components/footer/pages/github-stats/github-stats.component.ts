import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-github-stats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './github-stats.component.html',
  styleUrl: './github-stats.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceComponent {}