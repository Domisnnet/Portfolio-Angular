import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MeteorLayerComponent } from './meteor-layer.component';
import { MeteorFieldFactory } from './meteor-field.factory';
import { METEOR_FIELD_CONFIG } from './meteor-field.config';
import { Meteor } from './meteor-field.types';

@Component({
  selector: 'app-meteor-field',
  standalone: true,
  imports: [ MeteorLayerComponent ],
  templateUrl: './meteor-field.component.html',
  styleUrl: './meteor-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteorFieldComponent {
  private readonly meteorFactory = inject(MeteorFieldFactory);
  private readonly allMeteors = this.meteorFactory.create( METEOR_FIELD_CONFIG.total );
  private readonly groupedMeteors = this.meteorFactory.groupByLayer(this.allMeteors);
  readonly farMeteors: readonly Meteor[] = this.groupedMeteors.far;
  readonly midMeteors: readonly Meteor[] = this.groupedMeteors.mid;
  readonly nearMeteors: readonly Meteor[] = this.groupedMeteors.near;
}