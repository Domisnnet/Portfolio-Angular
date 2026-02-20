import { Routes } from '@angular/router';
import { CosmicLayoutComponent } from './layout/cosmic-layout/cosmic-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: CosmicLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (m) => m.HomeComponent),
        data: { cosmic: 'minimal' },
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./pages/projects/projects-page.component').then(
            (m) => m.ProjectsPageComponent
          ),
        data: { cosmic: 'full' },
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./pages/contact/contact-page.component').then(
            (m) => m.ContactPageComponent
          ),
        data: { cosmic: 'minimal' },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./components/footer/pages/about/about-page.component').then(
            (m) => m.AboutPageComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'ano2024',
        loadComponent: () =>
          import('./components/footer/pages/ano2024/ano-2024.component').then(
            (m) => m.Ano2024Component
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'background',
        loadComponent: () =>
          import('./components/footer/pages/background/background.component').then(
            (m) => m.BackgroundComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'domisdev',
        loadComponent: () =>
          import('./components/footer/pages/domisdev/domisdev.component').then(
            (m) => m.DomisdevComponent),
        data: { cosmic: 'silent' },
      },
      {
        path: 'stack',
        loadComponent: () =>
          import('./components/footer/pages/stack/stack.component').then(
            (m) => m.StackComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'architecture',
        loadComponent: () =>
          import('./components/footer/pages/architecture/architecture.component').then(
            (m) => m.ArchitectureComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'performance',
        loadComponent: () =>
          import('./components/footer/pages/performance/performance.component').then(
            (m) => m.PerformanceComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'access',
        loadComponent: () =>
          import('./components/footer/pages/access/access.component').then(
            (m) => m.AccessComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'future',
        loadComponent: () =>
          import('./components/footer/pages/future/future.component').then(
            (m) => m.FutureComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'camadas',
        loadComponent: () =>
          import('./components/footer/pages/camadas/camadas.component').then(
            (m) => m.CamadasComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'github-stats',
        loadComponent: () =>
          import('./components/footer/pages/github-stats/github-stats.component').then(
            (m) => m.GithubStatsComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'persistir',
        loadComponent: () =>
          import('./components/footer/pages/persistir/persistir.component').then(
            (m) => m.PersistirComponent
          ),
        data: { cosmic: 'silent' }, 
      },
      {
        path: 'privacidade',
        loadComponent: () =>
          import('./components/footer/pages/privacidade/privacidade.component').then(
            (m) => m.PrivacidadeComponent
          ),
        data: { cosmic: 'silent' },
      },
    ],
  },
];