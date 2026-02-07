import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, viewChild, inject } from '@angular/core';

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
  private starColor: string | undefined;
  private readonly STAR_COUNT = 400;
  private readonly MIN_TWINKLE_SPEED = 0.01;
  private readonly MAX_TWINKLE_SPEED = 0.03;

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
    const hostEl = this.hostRef.nativeElement;
    const dpr = window.devicePixelRatio || 1;
    const width = hostEl.clientWidth;
    const height = hostEl.clientHeight;

    canvasEl.width = width * dpr;
    canvasEl.height = height * dpr;
    canvasEl.style.width = `${width}px`;
    canvasEl.style.height = `${height}px`;
    this.ctx = canvasEl.getContext('2d')!;
    this.ctx.scale(dpr, dpr);
    this.starColor = getComputedStyle(hostEl).getPropertyValue('--color-text-primary').trim();
  }
  private createStars(): void {
    this.stars = [];
    const width = this.hostRef.nativeElement.clientWidth;
    const height = this.hostRef.nativeElement.clientHeight;
    for (let i = 0; i < this.STAR_COUNT; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
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
  }
  private draw(): void {
    if (!this.starColor) return;
    const { clientWidth, clientHeight } = this.hostRef.nativeElement;
    this.ctx.clearRect(0, 0, clientWidth, clientHeight);
    for (const star of this.stars) {
      this.ctx.fillStyle = this.starColor;
      this.ctx.globalAlpha = star.opacity;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1; 
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
  }
}