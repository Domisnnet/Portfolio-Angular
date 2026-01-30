import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-persistir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './persistir.component.html',
  styleUrls: ['./persistir.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersistirComponent {
  eggActive = false;
  eggClicks = 0;

  activateEasterEgg(event?: Event) {
    this.eggClicks++;
    const keyboardEvent = event as KeyboardEvent;
    if (this.eggClicks >= 3 || keyboardEvent?.code === 'Space') {
      this.eggActive = true;
      this.eggClicks = 0;
    }
  }

  ngOnDestroy() {
    localStorage.setItem('domisdev-egg', 'activated');
  }
}