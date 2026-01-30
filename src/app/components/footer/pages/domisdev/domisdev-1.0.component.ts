import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-domisdev-1-0',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domisdev-1.0.component.html',
  styleUrls: ['./domisdev-1.0.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Domisdev10Component {}