import { Component } from '@angular/core';
import { ProjectLabCardComponent } from '../components/project-lab-card/project-lab-card.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-projects-lab-page',
  standalone: true,
  imports: [CommonModule, ProjectLabCardComponent], 
  templateUrl: './projects-lab.page.html',
  styleUrls: ['./projects-lab.page.scss']
})
export class ProjectsLabPage {
  projects = [
    { title: 'Projeto LAB 01', image: 'https://picsum.photos/400/300?random=1' },
    { title: 'Projeto LAB 02', image: 'https://picsum.photos/400/300?random=2' }
  ];

  trackByTitle(index: number, project: any) {
    return project.title;
  }
}