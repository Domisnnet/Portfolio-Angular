import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domisdev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domisdev-1.0.component.html',
  styleUrls: ['./domisdev-1.0.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomisdevV1Component {}