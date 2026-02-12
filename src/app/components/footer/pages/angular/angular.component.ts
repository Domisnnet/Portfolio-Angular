import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularComponent {
  appComponentCode = `@Component({
  standalone: true,
  imports: [StackPillComponent, HeroLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <app-hero-layout>
      @for (tech of portfolioStack; track tech.name) {
        <app-stack-pill 
          [tag]="tech.name" 
          [category]="tech.category">
        </app-stack-pill>
      }
    </app-hero-layout>
  \`
  })
  export class AppComponent {
    portfolioStack = [
      {name: 'Angular', category: 'core'},
      {name: 'Firebase', category: 'backend'},
      {name: 'SCSS', category: 'style'}
    ];
  }`;

  stackPillComponentCode = `tag = input.required<string>();
  category = input.required<PillCategory>();
  isFlipped = signal(false);
  pillConfig = computed(() => {
    const config = TAG_CONFIG[this.tag()] ?? {
      label: this.tag(),
      iconPath: \`assets/icons/\${this.tag().toLowerCase()}.svg\`,
      category: 'frontend' as const
    };
    return config;
  });

  flipPill() {
    this.isFlipped.update(flipped => !flipped);
    // Animation trigger
  }`;
}