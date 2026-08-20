import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Meteor, MeteorLayer } from './meteor-field.types';

@Component({
  selector: 'app-meteor-layer',
  standalone: true,
  imports: [],
  templateUrl: './meteor-layer.component.html',
  styleUrls: ['./meteor-layer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteorLayerComponent {
  readonly layer = input.required<MeteorLayer>();
  readonly meteors = input.required<readonly Meteor[]>();
}