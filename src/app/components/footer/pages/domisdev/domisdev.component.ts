import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domisdev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domisdev.component.html',
  styleUrls: ['./domisdev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomisdevComponent {}