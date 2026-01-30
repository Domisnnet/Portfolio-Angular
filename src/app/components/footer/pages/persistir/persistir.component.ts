import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-persistir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './persistir.component.html',
  styleUrl: './persistir.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersistirComponent {
  eggActive = false;

  activateEasterEgg() {
    this.eggClicks++;
    if (this.eggClicks >= 3 || event?.code === 'Space') {
      this.eggActive = true;
      this.eggClicks = 0;
    }
  }

  ngOnDestroy() {
    localStorage.setItem('domisdev-egg', 'activated');
  }
}