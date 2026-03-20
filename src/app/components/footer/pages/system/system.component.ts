import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class SystemComponent {}