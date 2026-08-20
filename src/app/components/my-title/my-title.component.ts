import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderConfig } from '@app/data/header-data';

@Component({
  selector: 'app-my-title',
  standalone: true,
  imports: [ CommonModule ], 
  templateUrl: './my-title.component.html',
  styleUrls: ['./my-title.component.scss']
})
export class MyTitleComponent {
  @Input({ required: true }) config!: HeaderConfig;
}