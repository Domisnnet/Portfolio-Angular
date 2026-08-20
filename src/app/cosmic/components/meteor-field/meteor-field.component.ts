import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MeteorLayerComponent } from './meteor-layer.component';
import { MeteorFieldFactory } from './meteor-field.factory';
import { Meteor } from './meteor-field.types';

@Component({
  selector: 'app-meteor-field',
  standalone: true,
  imports: [ MeteorLayerComponent ],
  templateUrl: './meteor-field.component.html',
  styleUrls: ['./meteor-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteorFieldComponent {
  private readonly meteorFieldFactory = inject(MeteorFieldFactory);
  private readonly allMeteors: readonly Meteor[] = this.meteorFieldFactory.create();
  private readonly groupedMeteors = this.meteorFieldFactory.groupByLayer(this.allMeteors);
  readonly farMeteors: readonly Meteor[] = this.groupedMeteors.far;
  readonly midMeteors: readonly Meteor[] = this.groupedMeteors.mid;
  readonly nearMeteors: readonly Meteor[] = this.groupedMeteors.near;
}