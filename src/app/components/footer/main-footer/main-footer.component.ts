import { Component,ChangeDetectionStrategy,inject } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFooterComponent {}