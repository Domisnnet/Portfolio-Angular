import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Meteor {
  readonly id: number;
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
  styleUrl: './meteor-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeteorFieldComponent {
  readonly meteors: readonly Meteor[] = [
    {
      id: 1,
      x: 108,
      y: 18,
      size: 0.72,
      speed: 5.8,
      angle: 155,
      intensity: 0.72,
      delay: -1.2,
    },
    {
      id: 2,
      x: 118,
      y: 42,
      size: 1,
      speed: 7.4,
      angle: 158,
      intensity: 0.9,
      delay: -4.8,
    },
    {
      id: 3,
      x: 104,
      y: 68,
      size: 0.5,
      speed: 4.9,
      angle: 152,
      intensity: 0.58,
      delay: -2.6,
    },
    {
      id: 4,
      x: 125,
      y: 82,
      size: 1.25,
      speed: 8.8,
      angle: 160,
      intensity: 1,
      delay: -6.4,
    },
    {
      id: 5,
      x: 112,
      y: 55,
      size: 0.38,
      speed: 4.2,
      angle: 148,
      intensity: 0.45,
      delay: -8.1,
    },
  ];
  trackById(_: number, meteor: Meteor): number { return meteor.id; }
}