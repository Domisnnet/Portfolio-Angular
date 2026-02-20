import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(16px) scale(0.98)'
        }),
        animate(
          '320ms cubic-bezier(.2,.8,.2,1)',
          style({
            opacity: 1,
            transform: 'translateY(0) scale(1)'
          })
        )
      ])
    ])
  ]
})
export class StackComponent {}