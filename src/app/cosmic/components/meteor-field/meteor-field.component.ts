import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Meteor { readonly id: number; readonly image: string; readonly x: number; readonly y: number; readonly size: string; readonly speed: string; readonly angle: number; readonly delay: string; }

@Component({
  selector: 'app-meteor-field',
  standalone: true,
  imports: [],
  templateUrl: './meteor-field.component.html',
  styleUrls: ['./meteor-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteorFieldComponent {
  readonly meteors: readonly Meteor[] = [
    { id: 1, image: 'assets/images/meteor1.png', x: 108, y: 7, size: '640px', speed: '11s', angle: 14, delay: '-2s' },
    { id: 2, image: 'assets/images/meteor2.png', x: 76, y: 16, size: '520px', speed: '9s', angle: 11, delay: '-6s' },
    { id: 3, image: 'assets/images/meteor3.png', x: 118, y: 25, size: '425px', speed: '13s', angle: 16, delay: '-9s' },
    { id: 4, image: 'assets/images/meteor4.png', x: 91, y: 33, size: '700px', speed: '10s', angle: 12, delay: '-4s' },
    { id: 5, image: 'assets/images/meteor5.png', x: 124, y: 43, size: '486px', speed: '12s', angle: 15, delay: '-8s' },
    { id: 6, image: 'assets/images/meteor6.png', x: 70, y: 52, size: '382px', speed: '8s', angle: 10, delay: '-3s' },
    { id: 7, image: 'assets/images/meteor2.png', x: 112, y: 61, size: '561px', speed: '14s', angle: 13, delay: '-11s' },
    { id: 8, image: 'assets/images/meteor4.png', x: 83, y: 72, size: '444px', speed: '10s', angle: 17, delay: '-5s' },
    { id: 9, image: 'assets/images/meteor1.png', x: 121, y: 82, size: '606px', speed: '12s', angle: 14, delay: '-7s' },
    { id: 10, image: 'assets/images/meteor3.png', x: 102, y: 93, size: '408px', speed: '9s', angle: 11, delay: '-10s' },
    { id: 11, image: 'assets/images/meteor5.png', x: 58, y: 11, size: '469px', speed: '15s', angle: 18, delay: '-13s' },
    { id: 12, image: 'assets/images/meteor6.png', x: 132, y: 20, size: '347px', speed: '10s', angle: 13, delay: '-1s' },
    { id: 13, image: 'assets/images/meteor1.png', x: 64, y: 39, size: '581px', speed: '13s', angle: 15, delay: '-12s' },
    { id: 14, image: 'assets/images/meteor3.png', x: 137, y: 48, size: '363px', speed: '8s', angle: 12, delay: '-6s' },
    { id: 15, image: 'assets/images/meteor5.png', x: 94, y: 57, size: '500px', speed: '11s', angle: 16, delay: '-14s' },
    { id: 16, image: 'assets/images/meteor2.png', x: 72, y: 68, size: '423px', speed: '14s', angle: 14, delay: '-9s' },
    { id: 17, image: 'assets/images/meteor4.png', x: 128, y: 77, size: '622px', speed: '12s', angle: 17, delay: '-15s' },
    { id: 18, image: 'assets/images/meteor6.png', x: 55, y: 88, size: '32px', speed: '9s', angle: 11, delay: '-4s' }
  ];
}