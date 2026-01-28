import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects-page.component').then(m => m.ProjectsPageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: 'lab',
    loadComponent: () => import('./pages/projetos-lab/pages/projects-lab.page').then(m => m.ProjectsLabPage)
  },
  {
    path: 'privacidade',
    loadComponent: () => import('./components/footer/pages/privacidade/privacidade.component').then(m => m.PrivacidadeComponent)
  },
  {
    path: 'background',
    loadComponent: () => import('./components/footer/pages/background/background.component').then(m => m.BackgroundComponent)
  },
  {
    path: '2024',
    loadComponent: () => import('./components/footer/pages/2024/2024.component').then(m => m.Year2024Component)
  },
  {
    path: 'domisdev-v1-0',
    loadComponent: () => import('./components/footer/pages/domisdev-v1.0/domisdev-v1.0.component').then(m => m.DomisdevV1Component)
  }
];