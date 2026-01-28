import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import aboutContent from '../../../assets/content/about-content.json';

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
        highlight: string;
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
      highlight: string;
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

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('panelEnter', [
      transition(':enter', [
        style({
          transform: 'translate(-50%, 100%) scale(0.85)',
          opacity: 0
        }),
        animate(
          '900ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: 1
          })
        )
      ])
    ])
  ]
})
export class AboutPageComponent {
  isTextMode = false;
  language: Language = 'pt';

  content = aboutContent[this.language];

  toggleMode(): void {
    this.isTextMode = !this.isTextMode;
  }

  toggleLanguage(lang: Language): void {
    this.language = lang;
    this.content = aboutContent[this.language];
  }
}