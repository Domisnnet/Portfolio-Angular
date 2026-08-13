import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CosmicRootComponent } from '@app/cosmic/components/cosmic-root/cosmic-root.component';
import { SecretStarComponent } from '@app/cosmic/components/secret-star/secret-star.component';
import { LayerJumpComponent } from '@app/cosmic/components/layer-jump/layer-jump.component';
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
    CosmicRootComponent,
    SecretStarComponent,
    LayerJumpComponent, 
    ProjectCardComponent
  ],
  templateUrl: './deep-space.component.html',
  styleUrls: ['./deep-space.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeepSpacePageComponent {
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
  ]);
}
