import { ChangeDetectionStrategy,Component,ElementRef,OnDestroy,AfterViewInit,viewChild,inject, } from '@angular/core';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  dir: 1 | -1;
}
type CosmicEffectsMode = 'full' | 'minimal' | 'silent';

@Component({
  selector: 'app-cosmic-stars',
  standalone: true,
  templateUrl: './cosmic-stars.component.html',
  styleUrls: ['./cosmic-stars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CosmicStarsComponent implements AfterViewInit, OnDestroy {
  private canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('starsCanvas');
  private hostRef = inject(ElementRef<HTMLElement>);
  private ctx!: CanvasRenderingContext2D;
  private dpr = window.devicePixelRatio || 1;
  private width = 0;
  private height = 0;
  private stars: Star[] = [];
  private animationId?: number;
  private readonly STAR_COUNT_FULL = 420;
  private readonly STAR_COUNT_MINIMAL = 180;
  private readonly MIN_RADIUS = 0.4;
  private readonly MAX_RADIUS = 1.6;
  private readonly MIN_SPEED = 0.008;
  private readonly MAX_SPEED = 0.03;
  ngAfterViewInit(): void {
    this.initCanvas();
    this.createStars();
    this.animate();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    window.removeEventListener('resize', this.onResize);
  }

  private initCanvas(): void {
    const canvas = this.canvasRef().nativeElement;
    const rect = this.hostRef.nativeElement.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;
    canvas.width = Math.floor(this.width * this.dpr);
    canvas.height = Math.floor(this.height * this.dpr);
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private createStars(): void {
    const count =
      this.getEffectsMode() === 'minimal'
        ? this.STAR_COUNT_MINIMAL
        : this.STAR_COUNT_FULL;
    this.stars = Array.from({ length: count }, () => ({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      radius:
        Math.random() * (this.MAX_RADIUS - this.MIN_RADIUS) +
        this.MIN_RADIUS,
      opacity: Math.random() * 0.5 + 0.25,
      speed:
        Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED,
      dir: Math.random() > 0.5 ? 1 : -1,
    }));
  }

  private animate = (): void => {
    if (this.getEffectsMode() === 'silent') {
      this.ctx.clearRect(0, 0, this.width, this.height);
      return;
    }
    this.draw();
    this.update();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private draw(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const color = this.getStarColor();
    for (const star of this.stars) {
      this.ctx.globalAlpha = star.opacity;
      this.ctx.fillStyle = color;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
  }

  private update(): void {
    for (const star of this.stars) {
      star.opacity += star.speed * star.dir;
      if (star.opacity <= 0.2 || star.opacity >= 0.85) { star.dir *= -1; }
    }
  }

  private getStarColor(): string {
    const styles = getComputedStyle(document.documentElement);
    const color =
      styles.getPropertyValue('--stars-df').trim() ||
      styles.getPropertyValue('--star-color').trim();
  
    if (!color) {
      throw new Error(
        '[CosmicStars] Missing CSS contract: --stars-df or --star-color'
      );
    }
    return color;
  }  

  private getEffectsMode(): CosmicEffectsMode {
    return (
      (document.documentElement.getAttribute(
        'data-cosmic-effects'
      ) as CosmicEffectsMode) || 'full'
    );
  }

  private onResize = (): void => {
    this.initCanvas();
    this.createStars();
  };
}