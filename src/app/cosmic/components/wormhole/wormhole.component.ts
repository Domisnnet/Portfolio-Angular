import { Component, ElementRef, NgZone, computed, effect, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

const DURATION_S = 99;
const SPEED = 0.1;
const TAU = Math.PI * 2;
type RGB = [number, number, number];
const WHITE_LILAC: RGB = [238, 226, 255];
const VIOLET: RGB = [150, 100, 255];
const BLUE: RGB = [70, 120, 255];
const WARM: RGB = [255, 170, 130];
const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;
const mixC = (a: RGB, b: RGB, k: number): RGB => [
  lerp(a[0], b[0], k),
  lerp(a[1], b[1], k),
  lerp(a[2], b[2], k) 
];
const str = (c: RGB): string => `${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])}`;
const filColor = (p: number, warm: boolean): string => { const base: RGB = p 
  < 0.35 ? mixC(WHITE_LILAC, VIOLET, p / 0.35) : mixC(VIOLET, BLUE, (p - 0.35) / 0.65); 
  return str(warm ? mixC(base, WARM, 0.55) : base);
};
interface Rock {
  a: number;
  z: number;
  size: number;
  rot: number;
  spin: number;
  verts: number[];
}
@Component({
  selector: 'app-wormhole',
  standalone: true,
  imports: [],
  templateUrl: './wormhole.component.html',
  styleUrls: ['./wormhole.component.scss']
})
export class WormholeComponent {
  private readonly cosmic = inject(CosmicLayerService);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);
  readonly isActive = computed(() => this.cosmic.layer() === 'wormhole');
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('wormholeCanvas');
  constructor() {
    effect((onCleanup) => {
      const canvas = this.canvasRef()?.nativeElement;
      if (!canvas) return;
      const stop = this.zone.runOutsideAngular(() => this.run(canvas));
      onCleanup(stop);
    });
  }

  private run(canvas: HTMLCanvasElement): () => void {
    const ctx = canvas.getContext('2d');
    if (!ctx) { this.zone.run(() => this.finish()); return () => undefined; }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 1000 : DURATION_S;
    const rand = Math.random;
    let w = 0;
    let h = 0;
    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    // ---------- elementos da cena ----------
    const stars = Array.from({ length: 650 }, () => ({
      x: rand(),
      y: rand(),
      s: 0.4 + rand() * 1.3,
      ph: rand() * TAU,
      sp: 0.0006 + rand() * 0.0018,
      c: rand() < 0.2 ? '255,200,160' : rand() < 0.5 ? '190,210,255' : '255,255,255'
    }));
    const flares = Array.from({ length: 6 }, () => ({
      x: rand(),
      y: rand(),
      s: 6 + rand() * 8
    }));
    const blobs = Array.from({ length: 7 }, () => ({
      x: rand(),
      y: rand(),
      r: 0.18 + rand() * 0.25,
      c: rand() < 0.5 ? '110,60,220' : '50,90,230'
    }));
    const dust = Array.from({ length: 110 }, () => ({
      a: rand() * TAU,
      z: 0.05 + rand() * 0.95,
      lw: 0.6 + rand() * 0.7
    }));
    const fils = Array.from({ length: 100 }, () => {
      const p0 = Math.pow(rand(), 1.8) * 0.55;
      return {
        a0: rand() * TAU,
        tw: 2.2 + rand() * 0.8,
        p0,
        p1: Math.min(1, p0 + 0.25 + rand() * 0.35),
        seed: rand() * TAU,
        w: 0.6 + rand() * 1.6,
        al: 0.25 + rand() * 0.45,
        warm: rand() < 0.1
      };
    });
    const arcs = Array.from({ length: 42 }, (_, i) => ({
      a: rand() * TAU,
      len: 0.3 + rand() * 0.9,
      ring: i % 7,
      w: 1 + (i % 3) * 0.7,
      al: 0.4 + rand() * 0.5
    }));
    const spawnRock = (initial: boolean, i = 0): Rock => ({
      a: initial ? (i / 12) * TAU + (rand() - 0.5) * 0.4 : rand() * TAU,
      z: initial ? 0.12 + rand() * 0.4 : 0.85 + rand() * 0.15,
      size: 0.6 + rand() * 1.1,
      rot: rand() * TAU,
      spin: (rand() - 0.5) * 0.0006,
      verts: Array.from({ length: 12 }, () => 0.82 + rand() * 0.3)
    });
    const rocks: Rock[] = Array.from({ length: 12 }, (_, i) => spawnRock(true, i));
    // ---------- loop ----------
    let phase = 0;
    const t0 = performance.now();
    let last = t0;
    let raf = 0;
    let stopped = false;
    const stop = (): void => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
    const frame = (now: number): void => {
      if (stopped) return;
      const dt = Math.min(50, now - last);
      last = now;
      const t = Math.max(0, now - t0);
      const u = Math.min(1, t / duration);
      const S = Math.max(w, h);
      const cx = w / 2;
      const cy = h / 2;
      const speed = SPEED * (1 + 2.5 * u * u * u);
      phase += dt * 0.00005 * speed;
      const Z = 1 + 0.08 * u + 2.2 * Math.pow(u, 6); // "mergulho" no final
      const R = S * 0.065;
      canvas.style.opacity = String(Math.min(1, u / 0.1));
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
      ctx.lineCap = 'round';
      ctx.fillStyle = '#03040c';
      ctx.fillRect(0, 0, w, h);
      // nebulosas de fundo
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * S);
        g.addColorStop(0, `rgba(${b.c},0.14)`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(Z, Z);
      ctx.translate(-cx, -cy);
      // poeira radial, bem sutil
      ctx.globalCompositeOperation = 'lighter';
      for (const d of dust) {
        const dz = dt * 0.00012 * speed;
        d.z -= dz;
        if (d.z <= 0.05) {
          d.z = 1;
          d.a = rand() * TAU;
          continue;
        }
        const head = (S * 0.035) / d.z;
        const tail = (S * 0.035) / Math.min(1, d.z + dz * 10);
        const near = 1 - d.z;
        ctx.strokeStyle = `rgba(190,205,255,${(0.1 + near * 0.35).toFixed(2)})`;
        ctx.lineWidth = d.lw;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(d.a) * tail, cy + Math.sin(d.a) * tail);
        ctx.lineTo(cx + Math.cos(d.a) * head, cy + Math.sin(d.a) * head);
        ctx.stroke();
      }
      // ---------- vórtice (plano levemente inclinado, como na referência) ----------
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.86);
      // massa luminosa do vórtice
      const vg = ctx.createRadialGradient(0, 0, R, 0, 0, R * 9);
      vg.addColorStop(0, 'rgba(90,60,200,0)');
      vg.addColorStop(0.1, 'rgba(120,80,240,0.28)');
      vg.addColorStop(0.4, 'rgba(70,60,190,0.18)');
      vg.addColorStop(1, 'rgba(30,30,120,0)');
      ctx.fillStyle = vg;
      ctx.beginPath();
      ctx.arc(0, 0, R * 9, 0, TAU);
      ctx.fill();
      // filamentos em espiral (rotação rígida de uma espiral logarítmica = efeito de "sucção")
      const N = 30;
      for (const f of fils) {
        let px = 0;
        let py = 0;
        ctx.lineWidth = f.w;
        for (let q = 0; q <= N; q++) {
          const p = lerp(f.p0, f.p1, q / N);
          let r = R * (1.25 + 7.6 * Math.pow(p, 1.5));
          r *= 1 + 0.02 * Math.sin(p * 33 + f.seed * 2 - phase * 7);
          const ang =
            f.a0 +
            f.tw * Math.log(r / R) +
            phase * 5 +
            0.035 * Math.sin(p * 21 + f.seed + phase * 9);
          const x = Math.cos(ang) * r;
          const y = Math.sin(ang) * r;
          if (q > 0) {
            const fade = Math.sin((Math.PI * (q - 0.5)) / N);
            ctx.strokeStyle = `rgba(${filColor(p, f.warm)},${Math.min(1, f.al * fade * (1 + (1 - p) * 0.7)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          px = x;
          py = y;
        }
      }
      // anel branco-lilás em volta do buraco
      const Rr = R * (1 + 0.015 * Math.sin(t * 0.0015));
      const rg = ctx.createRadialGradient(0, 0, Rr * 0.98, 0, 0, Rr * 2);
      rg.addColorStop(0, 'rgba(255,255,255,1)');
      rg.addColorStop(0.18, 'rgba(240,225,255,0.9)');
      rg.addColorStop(0.4, 'rgba(180,140,255,0.5)');
      rg.addColorStop(0.7, 'rgba(110,80,230,0.18)');
      rg.addColorStop(1, 'rgba(80,60,200,0)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(0, 0, Rr * 2, 0, TAU);
      ctx.fill();
      // arcos elétricos girando dentro do anel
      for (const a of arcs) {
        const rr = Rr * (1.03 + a.ring * 0.06);
        const ang = a.a + phase * (16 - a.ring * 1.6);
        ctx.strokeStyle = `rgba(${a.ring % 2 ? '255,255,255' : '215,195,255'},${a.al.toFixed(2)})`;
        ctx.lineWidth = a.w;
        ctx.beginPath();
        ctx.arc(0, 0, rr, ang, ang + a.len);
        ctx.stroke();
      }
      // buraco negro
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, 0, Rr, 0, TAU);
      ctx.fill();
      ctx.restore(); // fim do plano inclinado
      // vinheta
      const vig = ctx.createRadialGradient(cx, cy, S * 0.3, cx, cy, S * 0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
      // clarão final
      if (u > 0.86) {
        const f = (u - 0.86) / 0.14;
        ctx.fillStyle = `rgba(235,225,255,${(f * f).toFixed(3)})`;
        ctx.fillRect(0, 0, w, h);
      }
      if (u >= 1) {
        stop();
        this.zone.run(() => this.finish());
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return stop;
  }

  private finish(): void {
    this.cosmic.finishJump();
    void this.router.navigate(['/deep-space']);
  }
}
