import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import aboutContent from '@assets/content/about-content.json';

type Language = 'pt' | 'en';

interface AboutContent {
  cmd: {
    whoami: string;
  };
  meta: {
    timestamp: string;
    paused: string;
    reboot: string;
    present: string;
    closing: string;
    executing: string;
  };
  logs: {
    origin: {
      intro: string;
      details: {
        text: string;
        neon: string;
        suffix: string;
      }[];
    };
    pause: {
      text: string;
      mono: string;
      suffix: string;
      dna: string;
    };
    reboot: {
      text: string;
      neonrx: string;
      course: string;
      details: string;
    };
    present: {
      text: string;
      details: string;
      commitment: string;
      suffix: string;
    };
    closing: {
      text: string;
      neon: string;
      suffix: string;
    };
  };
  actions: {
    simple: string;
    technical: string;
  };
  simple: {
    title: string;
    p1: string;
    p2: string;
    p3: string;
  };
}
const CONTENT = aboutContent as Record<Language, AboutContent>;
@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px) scale(0.95)' }),
        animate(
          '700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' })
        )
      ])
    ])
  ]
})
export class AboutPageComponent {
  isTextMode = false;
  language: Language = 'pt';
  content: AboutContent = CONTENT[this.language];
  toggleMode(): void {
    this.isTextMode = !this.isTextMode;
  }
  toggleLanguage(lang: Language): void {
    if (this.language === lang) return;

    this.language = lang;
    this.content = CONTENT[this.language];
  }
}