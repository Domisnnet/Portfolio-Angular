import { Component, Input } from '@angular/core';

export interface Project {
  image: string;
  title: string;
  description?: string; 
}

@Component({
  selector: 'app-project-lab-card',
  templateUrl: './project-lab-card.component.html',
  styleUrls: ['./project-lab-card.component.scss']
})
export class ProjectLabCardComponent {
  @Input() project!: Project;
}