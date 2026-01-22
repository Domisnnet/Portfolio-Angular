import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { TagKey } from '../../constants/project-tags.config';

export interface Project {
  title: string;
  description: string;
  image: string;
  tags: TagKey[];
  link: string;
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    /*{
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
      link: 'https://github.com/Domisnnet/Shadow-Flip-Oh',
    },
    {
      title: 'Kill Buzz',
      description: 'Jogo de reflexo em tempo real.',
      image: 'assets/images/kill-buzz.png',
      tags: ['ux', 'product', 'javascript'],
      link: 'https://github.com/Domisnnet/Kill-Buzz',
    },
    {
      title: 'Pokedevs',
      description: 'Projeto temático combinando design divertido.',
      image: 'assets/images/pokedevs.png',
      tags: ['javascript', 'css3', 'ui'],
      link: 'https://github.com/Domisnnet/Pokedevs',
    },
    {
      title: 'Projeto Alura',
      description: 'Aplicação estilizada com boas práticas.',
      image: 'assets/images/projeto-alura.png',
      tags: ['html5', 'css3', 'javascript'],
      link: 'https://github.com/Domisnnet/Projeto-Alura',
    },
    {
      title: 'Portfolio',
      description: 'Portfólio animado com narrativa visual.',
      image: 'assets/images/portfolio.png',
      tags: ['angular', 'scss', 'motions', 'design'],
      link: 'https://portfolio-56747762-94d87.web.app/',
    }, */
  ]);
}