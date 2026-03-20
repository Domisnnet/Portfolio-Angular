import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class BackgroundComponent {}