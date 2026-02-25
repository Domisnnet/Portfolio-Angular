import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-domisdev',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './domisdev.component.html',
  styleUrls: ['./domisdev.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class DomisdevComponent {}