import { ChangeDetectionStrategy, Component ,ElementRef, OnDestroy, OnInit, viewChild, inject, signal } from '@angular/core';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleDirection: number;
}

@Component({
  selector: 'app-cosmic-stars',
  standalone: true,
  templateUrl: './cosmic-stars.component.html',
  styleUrls: ['./cosmic-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosmicStarsComponent implements OnInit, OnDestroy {
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('starsCanvas');
  private hostRef = inject(ElementRef);
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationFrameId?: number;
  private readonly STAR_COUNT = 400;
  private readonly MIN_TWINKLE_SPEED = 0.01;
  private readonly MAX_TWINKLE_SPEED = 0.03;
  currentTheme = signal<'cosmic' | 'solar'>('cosmic');
  ngOnInit(): void {
    setTimeout(() => {
      this.initCanvas();
      this.createStars();
      this.animate();
      window.addEventListener('resize', this.onResize);
    }, 0);
  }
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
  }
  private initCanvas(): void {
    const canvasEl = this.canvas().nativeElement;
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvasEl.width = rect.width * dpr;
    canvasEl.height = rect.height * dpr;
    canvasEl.style.width = `${rect.width}px`;
    canvasEl.style.height = `${rect.height}px`;
    this.ctx = canvasEl.getContext('2d')!;
    this.ctx.scale(dpr, dpr);
  }
  private createStars(): void {
    this.stars = [];
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    for (let i = 0; i < this.STAR_COUNT; i++) {
      this.stars.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * (this.MAX_TWINKLE_SPEED - this.MIN_TWINKLE_SPEED) + this.MIN_TWINKLE_SPEED,
        twinkleDirection: Math.random() < 0.5 ? 1 : -1,
      });
    }
  }
  private animate = (): void => {
    this.draw();
    this.update();
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
  private draw(): void {
    const rect = this.hostRef.nativeElement.getBoundingClientRect();
    this.ctx.clearRect(0, 0, rect.width, rect.height);
    const root = document.documentElement;
    const theme = this.currentTheme();
    const rootStyle = getComputedStyle(document.documentElement);
    const starsRgb = rootStyle.getPropertyValue('--stars-df').trim() || rootStyle.getPropertyValue('--stars-bg').trim();

    for (const star of this.stars) {
      this.ctx.save();
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = `rgba(${starsRgb}, 1)`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }
  private update(): void {
    for (const star of this.stars) {
      star.opacity += star.twinkleSpeed * star.twinkleDirection;
      if (star.opacity <= 0.2 || star.opacity >= 0.8) {
        star.twinkleDirection *= -1;
      }
    }
  }
  private onResize = (): void => {
    this.initCanvas();
    this.createStars();
  };
  setTheme(theme: 'cosmic' | 'solar') {
    this.currentTheme.set(theme);
  }
}