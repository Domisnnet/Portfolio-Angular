import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, QueryList, ViewChildren } from '@angular/core';

interface Meteor { readonly id: number; readonly image: string; readonly x: number; readonly y: number; readonly size: string; readonly speed: string; readonly angle: number; readonly intensity: number; readonly delay: string; }

@Component({
  selector: 'app-meteor-field',
  standalone: true,
  imports: [],
  templateUrl: './meteor-field.component.html',
  styleUrls: ['./meteor-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeteorFieldComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('meteorElement')
  private readonly meteorElements!: QueryList< ElementRef<HTMLSpanElement> >;
  readonly meteors: readonly Meteor[] = [
    { id: 1, image: 'assets/images/meteor1.png', x: 108, y: 7, size: '64px', speed: '11s', angle: 14, intensity: 0.82, delay: '-2s' },
    { id: 2, image: 'assets/images/meteor2.png', x: 76, y: 16, size: '52px', speed: '9s', angle: 11, intensity: 0.68, delay: '-6s' },
    { id: 3, image: 'assets/images/meteor3.png', x: 118, y: 25, size: '42px', speed: '13s', angle: 16, intensity: 0.58, delay: '-9s' },
    { id: 4, image: 'assets/images/meteor4.png', x: 91, y: 33, size: '70px', speed: '10s', angle: 12, intensity: 0.9, delay: '-4s' },
    { id: 5, image: 'assets/images/meteor5.png', x: 124, y: 43, size: '48px', speed: '12s', angle: 15, intensity: 0.7, delay: '-8s' },
    { id: 6, image: 'assets/images/meteor6.png', x: 70, y: 52, size: '38px', speed: '8s', angle: 10, intensity: 0.52, delay: '-3s' },
    { id: 7, image: 'assets/images/meteor2.png', x: 112, y: 61, size: '56px', speed: '14s', angle: 13, intensity: 0.72, delay: '-11s' },
    { id: 8, image: 'assets/images/meteor4.png', x: 83, y: 72, size: '44px', speed: '10s', angle: 17, intensity: 0.62, delay: '-5s' },
    { id: 9, image: 'assets/images/meteor1.png', x: 121, y: 82, size: '60px', speed: '12s', angle: 14, intensity: 0.78, delay: '-7s' },
    { id: 10, image: 'assets/images/meteor3.png', x: 102, y: 93, size: '40px', speed: '9s', angle: 11, intensity: 0.55, delay: '-10s' },
    { id: 11, image: 'assets/images/meteor5.png', x: 58, y: 11, size: '46px', speed: '15s', angle: 18, intensity: 0.6, delay: '-13s' },
    { id: 12, image: 'assets/images/meteor6.png', x: 132, y: 20, size: '34px', speed: '10s', angle: 13, intensity: 0.48, delay: '-1s' },
    { id: 13, image: 'assets/images/meteor1.png', x: 64, y: 39, size: '58px', speed: '13s', angle: 15, intensity: 0.74, delay: '-12s' },
    { id: 14, image: 'assets/images/meteor3.png', x: 137, y: 48, size: '36px', speed: '8s', angle: 12, intensity: 0.5, delay: '-6s' },
    { id: 15, image: 'assets/images/meteor5.png', x: 94, y: 57, size: '50px', speed: '11s', angle: 16, intensity: 0.66, delay: '-14s' },
    { id: 16, image: 'assets/images/meteor2.png', x: 72, y: 68, size: '42px', speed: '14s', angle: 14, intensity: 0.56, delay: '-9s' },
    { id: 17, image: 'assets/images/meteor4.png', x: 128, y: 77, size: '62px', speed: '12s', angle: 17, intensity: 0.84, delay: '-15s' },
    { id: 18, image: 'assets/images/meteor6.png', x: 55, y: 88, size: '32px', speed: '9s', angle: 11, intensity: 0.46, delay: '-4s' }
  ];
  private animationFrameId: number | null = null;
  private readonly startTime = performance.now();
  ngAfterViewInit(): void {
    this.initializeMeteors();
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  private initializeMeteors(): void {
    this.meteorElements.forEach((meteorElement, index) => {
      const meteor = this.meteors[index];

      if (!meteor) {
        return;
      }
      const element = meteorElement.nativeElement;
      element.style.width = meteor.size;
      element.style.opacity = String(meteor.intensity);
      element.style.setProperty(
        '--meteor-angle',
        `${meteor.angle}deg`
      );
      element.dataset['startX'] = String(meteor.x);
      element.dataset['startY'] = String(meteor.y);
      element.dataset['delay'] = meteor.delay;
    });
  }
  private animate = (currentTime: number): void => {
    const elapsedTime = currentTime - this.startTime;

    this.meteorElements.forEach((meteorElement, index) => {
      const meteor = this.meteors[index];
      if (!meteor) {
        return;
      }
      const element = meteorElement.nativeElement;
      const delay = this.parseDelay(meteor.delay);
      const duration = this.parseDuration(meteor.speed);
      const progress = this.getProgress(
        elapsedTime,
        delay,
        duration
      );
      const x = meteor.x - progress * 220;
      const y = meteor.y + progress * 150;
      element.style.transform = `
        translate3d(${x}vw, ${y}vh, 0)
        rotate(${meteor.angle}deg)
      `;
      element.style.opacity = this.getOpacity(
        progress,
        meteor.intensity
      );
    });
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
  private getProgress(
    elapsedTime: number,
    delay: number,
    duration: number
  ): number {
    const localTime =
      (elapsedTime + delay) % duration;
    if (localTime < 0) {
      return 0;
    }
    return localTime / duration;
  }
  private getOpacity(
    progress: number,
    intensity: number
  ): string {
    if (progress <= 0.08) {
      return String((progress / 0.08) * intensity);
    }
    if (progress >= 0.82) {
      return String(
        ((1 - progress) / 0.18) * intensity
      );
    }
    return String(intensity);
  }
  private parseDuration(value: string): number {
    const seconds = Number.parseFloat(value);
    return Number.isFinite(seconds) && seconds > 0
      ? seconds * 1000
      : 10000;
  }
  private parseDelay(value: string): number {
    const seconds = Number.parseFloat(value);
    return Number.isFinite(seconds)
      ? seconds * 1000
      : 0;
  }
}