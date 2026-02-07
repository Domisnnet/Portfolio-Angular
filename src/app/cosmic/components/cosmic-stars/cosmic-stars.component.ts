import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, viewChild } from '@angular/core';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
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
  private ctx!: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private animationFrameId?: number;

  private readonly STAR_COUNT = 400;
  private readonly STAR_COLOR = 'rgba(255, 255, 255, 0.8)';
  private readonly MIN_SPEED = 0.1;
  private readonly MAX_SPEED = 0.5;
  private readonly MIN_TWINKLE_SPEED = 0.01;
  private readonly MAX_TWINKLE_SPEED = 0.03;

  ngOnInit(): void {
    this.initCanvas();
    this.createStars();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
  }

  private initCanvas(): void {
    const canvasEl = this.canvas().nativeElement;
    const dpr = window.devicePixelRatio || 1;
    canvasEl.width = window.innerWidth * dpr;
    canvasEl.height = window.innerHeight * dpr;
    this.ctx = canvasEl.getContext('2d')!;
    this.ctx.scale(dpr, dpr);
    canvasEl.style.width = `${window.innerWidth}px`;
    canvasEl.style.height = `${window.innerHeight}px`;
  }

  private createStars(): void {
    this.stars = [];
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (let i = 0; i < this.STAR_COUNT; i++) {
      this.stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED,
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
    this.ctx.clearRect(0, 0, this.canvas().nativeElement.width, this.canvas().nativeElement.height);
    this.ctx.fillStyle = this.STAR_COLOR;

    for (const star of this.stars) {
      this.ctx.globalAlpha = star.opacity;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1; // Reset alpha
  }

  private update(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (const star of this.stars) {
      // Movimento vertical
      star.y += star.speed;
      if (star.y > height) {
        star.y = 0;
        star.x = Math.random() * width;
      }

      // Efeito de "piscar"
      star.opacity += star.twinkleSpeed * star.twinkleDirection;
      if (star.opacity <= 0.3 || star.opacity >= 0.8) {
        star.twinkleDirection *= -1;
      }
    }
  }

  private onResize = (): void => {
    this.initCanvas();
    this.createStars();
  }
}