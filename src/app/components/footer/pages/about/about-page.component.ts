import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cardEnterAnimation } from '@app/components/card/card.animations';
import aboutData from '@assets/content/about-content.json';

export type Language = 'pt' | 'en';

export interface AboutContent {
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
      dna?: string;
    };
    reboot: {
      text: string;
      neonrx: string;
      course: string;
      neon: string;
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
      neonrx: string;
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

const CONTENT = aboutData as Record<Language, AboutContent>;
@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
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