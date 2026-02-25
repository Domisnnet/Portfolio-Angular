import { trigger, transition, style, animate } from '@angular/animations';

export const cardEnterAnimation =
  trigger('cardEnter', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
      animate(
        '700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        style({ opacity: 1, transform: 'translateY(0) scale(1)' })
      )
    ])
  ]);