import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstronautaComponent } from '@app/components/astronauta/astronauta.component';
import { CosmicRootComponent } from '@app/cosmic/components/cosmic-root/cosmic-root.component';
import { ProjectCardComponent } from '@app/components/project-card/project-card.component';
import { TagKey } from '@app/constants/project-tags.config';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: TagKey[];
  link: string;
}

@Component({
  selector: 'app-deep-space-page',
  standalone: true,
  imports: [
    CommonModule, 
    AstronautaComponent, 
    CosmicRootComponent, 
    ProjectCardComponent
  ],
  templateUrl: './deep-space.component.html',
  styleUrls: ['./deep-space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  readonly projects = signal<Project[]>([
    {
      title: 'Drakonik Nexus',
      description: 'Jogo de cartas inspirado em Yu-Gi-Oh! usando arquitetura moderna em Vue.Js',
      image: 'assets/images/drakonik-nexus.png',
      tags: ['vue', 'tailwind', 'firebase'],
      link: 'https://github.com/Domisnnet/Drakonik-Nexus-Vue.Js',
    },
    {
      title: 'KingDomfy',
      description: 'Streaming musical com player funcional, inspirada no Spotify.',
      image: 'assets/images/kingdomfy.png',
      tags: ['angular', 'firebase', 'architecture', 'ux'],
      link: 'https://github.com/Domisnnet/King-Domfy',
    },
    {
      title: 'GitHub Stats',
      description: 'Gerador de cards SVG personalizados com dados reais via API.',
      image: 'assets/images/github-stats.png',
      tags: ['svg', 'api', 'automation', 'github'],
      link: 'https://github.com/Domisnnet/GitHub-Stats',
    },
    {
      title: 'Shadow Flip-Oh!',
      description: 'Jogo de cartas com mecânicas estratégicas.',
      image: 'assets/images/shadow-flip-oh.png',
      tags: ['gameLogic', 'cssAnimations', 'javascript'],
      link: 'https://github.com/Domisnnet/Shadow-Flip-Oh-Vue.Js',
    }
  ]);
}
