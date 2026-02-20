import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './access.component.html',
  styleUrl: './access.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccessComponent {}