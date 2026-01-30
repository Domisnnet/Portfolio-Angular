import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-producao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producao.component.html',
  styleUrl: './producao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerformanceComponent {}