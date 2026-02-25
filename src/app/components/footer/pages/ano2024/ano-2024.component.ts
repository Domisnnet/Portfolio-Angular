import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-ano-2024',
  standalone: true,
  templateUrl: './ano-2024.component.html',
  styleUrls: ['./ano-2024.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class Ano2024Component {}