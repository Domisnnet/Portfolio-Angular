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
        data: { cosmic: 'silent' },
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
    ],
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page.component').then(
        (m) => m.AboutPageComponent
      ),
  },
  {
    path: 'privacidade',
    loadComponent: () =>
      import('./components/footer/pages/privacidade/privacidade.component').then(
        (m) => m.PrivacidadeComponent
      ),
  },
  {
    path: 'Ano2024',
    loadComponent: () =>
      import('./components/footer/pages/Ano2024/Ano2024.component').then(
        (m) => m.Ano2024Component
      ),
  }
];