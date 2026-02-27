import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type PillCategory =
  | 'frontend'
  | 'backend'
  | 'databases'
  | 'devops'
  | 'cms';

@Component({
  selector: 'app-stack-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stack-pill.component.html',
  styleUrls: ['./stack-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[attr.data-category]': 'category()', },
})
export class StackPillComponent {
  label = input.required<string>();
  iconPath = input<string>();
  category = input<PillCategory>('frontend');
}