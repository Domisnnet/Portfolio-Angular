import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { ThemeService } from './app/core/services/theme.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    ThemeService 
  ],
});