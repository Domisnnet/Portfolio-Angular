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
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        data: { cosmic: 'full' },
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
            import('./pages/about/about-page.component').then(
              (m) => m.AboutPageComponent
            ),
          data: { cosmic: 'silent' },
      },
      {
        path: 'Ano2024',
          loadComponent: () =>
            import('./components/footer/pages/Ano2024/Ano-2024.component').then(
              (m) => m.Year2024Component
            ),
          data: { cosmic: 'silent' },
      },
      {
        path: 'Background',
        loadComponent: () =>
          import('./components/footer/pages/background/background.component').then(
            (m) => m.BackgroundComponent
          ),
        data: { cosmic: 'silent' },
      },
      {
        path: 'Domisdev-v1.0',
          loadComponent: () =>
            import('./components/footer/pages/domisdev/domisdev-1.0.component').then(
              (m) => m.DomisdevV1Component
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
      }
    ],  
  }  
];