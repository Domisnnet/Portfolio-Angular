import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import aboutContent from '../../content/about-content.json';

type Language = 'pt' | 'en';

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
