import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {}