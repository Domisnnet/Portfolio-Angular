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
      y: 8,
      size: 0.55,
      speed: 48,
      angle: 5,
      intensity: 0.75,
      delay: 0,
    },
    {
      id: 2,
      image: 'assets/images/meteor2.png',
      x: 105,
      y: 24,
      size: 0.72,
      speed: 56,
      angle: 2,
      intensity: 0.9,
      delay: 18,
    },
    {
      id: 3,
      image: 'assets/images/meteor3.png',
      x: 96,
      y: 42,
      size: 0.45,
      speed: 52,
      angle: 3,
      intensity: 0.6,
      delay: 34,
    },
    {
      id: 4,
      image: 'assets/images/meteor4.png',
      x: 112,
      y: 58,
      size: 0.78,
      speed: 62,
      angle: 9,
      intensity: 0.95,
      delay: 12,
    },
    {
      id: 5,
      image: 'assets/images/meteor5.png',
      x: 100,
      y: 74,
      size: 0.58,
      speed: 54,
      angle: 4,
      intensity: 0.72,
      delay: 28,
    },
    {
      id: 6,
      image: 'assets/images/meteor6.png',
      x: 118,
      y: 15,
      size: 0.42,
      speed: 58,
      angle: 1,
      intensity: 0.5,
      delay: 42,
    },
  ];
}