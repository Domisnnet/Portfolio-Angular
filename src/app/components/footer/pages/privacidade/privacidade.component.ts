import { ChangeDetectionStrategy, Component } from '@angular/core';
import { cardEnterAnimation } from '@app/components/card/card.animations';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacidade',
  imports: [RouterLink],
  templateUrl: './privacidade.component.html',
  styleUrl: './privacidade.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class PrivacidadeComponent {}