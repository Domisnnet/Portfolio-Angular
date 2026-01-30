import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-camadas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camadas.component.html',
  styleUrl: './camadas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CamadasComponent {}