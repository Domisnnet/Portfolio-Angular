import { Component, Input, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

export type CosmicMode = 'silent' | 'minimal' | 'full';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private _mode = signal<CosmicMode>('full');

  @Input({ required: true })
  set modeInput(value: CosmicMode) {
    this._mode.set(value);
  }

  mode = computed(() => this._mode());

  isVisible = computed(() => this._mode() !== 'silent');
  isMinimal = computed(() => this._mode() === 'minimal');
  isFull = computed(() => this._mode() === 'full');
}