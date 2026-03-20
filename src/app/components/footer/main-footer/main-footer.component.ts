import { Component,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [ 
    CommonModule, 
    RouterModule 
  ],
  templateUrl: './main-footer.component.html',
  styleUrls: ['./main-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainFooterComponent {}