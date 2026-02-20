import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-future',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './future.component.html',
  styleUrl: './future.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FutureComponent {}