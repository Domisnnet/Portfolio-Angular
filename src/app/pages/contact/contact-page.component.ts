import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('panelEnter', [
      transition(':enter', [
        style({
          transform: 'translate(-50%, 100%) scale(0.85)',
          opacity: 0
        }),
        animate(
          '900ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1
          })
        )
      ])
    ])
  ]
})
export class ContactPageComponent {
  isTextMode = false;

  toggleMode(): void {
    this.isTextMode = !this.isTextMode;
  }
}