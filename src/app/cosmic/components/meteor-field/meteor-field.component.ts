import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Meteor {
  readonly id: number;
  readonly image: string;
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly speed: number;
  readonly angle: number;
  readonly intensity: number;
  readonly delay: number;
}

@Component({
  selector: 'app-meteor-field',
  standalone: true,
  imports: [],
  templateUrl: './meteor-field.component.html',
  styleUrls: ['./meteor-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeteorFieldComponent {
  readonly meteors: readonly Meteor[] = [
    {
      id: 1,
      image: 'assets/images/meteor1.png',
      x: 92,
      y: 35,
      size: 1.05,
      speed: 60,
      angle: 5,
      intensity: 0.75,
      delay: 0,
    },
  ];
}