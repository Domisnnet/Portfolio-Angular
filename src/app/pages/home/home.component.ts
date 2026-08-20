import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MyTitleComponent } from '@app/components/my-title/my-title.component';
import { PAGE_HEADERS, HeaderConfig } from '@app/data/header-data';
import { StackService } from '@app/services/stack.service';
import { PillCategory } from '@app/constants/project-tags.config';
import { StackPillComponent } from '@app/components/stack-pill/stack-pill.component';
import { HeroComponent } from '@app/components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    CommonModule, 
    MyTitleComponent,
    TitleCasePipe, 
    StackPillComponent, 
    HeroComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly headerData: HeaderConfig = PAGE_HEADERS['home'];
  readonly categories: readonly PillCategory[] = ['frontend', 'backend', 'databases', 'devops', 'cms'];
  public stackService = inject(StackService);
}