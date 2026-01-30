import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-persistir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './persistir.component.html',
  styleUrl: './persistir.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersistirComponent {}