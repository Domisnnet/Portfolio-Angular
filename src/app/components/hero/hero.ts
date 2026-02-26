import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@app/components/button/button.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}