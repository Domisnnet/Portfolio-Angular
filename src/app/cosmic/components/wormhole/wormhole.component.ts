import { Component, ElementRef, NgZone, computed, effect, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CosmicLayerService } from '@app/cosmic/state/cosmic-state.service';

/** Duração total do salto, em SEGUNDOS. */
const DURATION_S = 14;
/** Velocidade de rotação do vórtice (1 = padrão, 0.5 = metade, 2 = dobro). */
const SPEED = 1;
/** Inclinação (rad) e achatamento vertical do vórtice. */
const TILT = 0;
const SQUASH = 0.86;

const TAU = Math.PI * 2;
type RGB = [number, number, number];
const WHITE_LILAC: RGB = [238, 226, 255];
const VIOLET: RGB = [150, 100, 255];
const BLUE: RGB = [70, 120, 255];
const PINK: RGB = [225, 120, 235];
const CYAN: RGB = [130, 190, 255];
const WARM: RGB = [255, 170, 130];

const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;
const clamp = (v: number, lo = 0, hi = 1): number => Math.min(hi, Math.max(lo, v));
const smooth = (a: number, b: number, x: number): number => {
  const k = clamp((x - a) / (b - a));
  return k * k * (3 - 2 * k);
};
/** raio do filamento na posição p (0..1): disco definido, ~4,8 vezes o raio do buraco */
const radiusAt = (R: number, p: number): number => R * (1.2 + 3.6 * Math.pow(p, 1.4));
const mixC = (a: RGB, b: RGB, k: number): RGB => [
  lerp(a[0], b[0], k),
  lerp(a[1], b[1], k),
  lerp(a[2], b[2], k)
];
const str = (c: RGB): string => `${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])}`;

/** cor do filamento por posição radial (p) e "família" de cor */
const famColor = (p: number, fam: number): string => {
  const base: RGB =
    p < 0.35 ? mixC(WHITE_LILAC, VIOLET, p / 0.35) : mixC(VIOLET, BLUE, (p - 0.35) / 0.65);
  switch (fam) {
    case 1: return str(mixC(base, PINK, 0.65));
    case 2: return str(mixC(base, CYAN, 0.7));
    case 3: return str(mixC(base, WARM, 0.6));
    case 4: return str(mixC(base, WHITE_LILAC, 0.75));
    default: return str(base);
  }
};

interface Layer {
  cv: HTMLCanvasElement;
  rMax: number;
}

interface Rock {
  sp: number;
  a: number;
  r0: number;
  size: number;
  f: number;
  ph: number;
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
    if (!ctx) {
      this.zone.run(() => this.finish());
      return () => undefined;
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = (reduce ? 1 : DURATION_S) * 1000;
    const rand = Math.random;
    // DIAGNÓSTICO (pode remover depois)
    console.info(`[wormhole] iniciando: ${duration / 1000}s | reduzir movimento: ${reduce}`);

    // ---------- utilitários de canvas fora da tela ----------
    const newCanvas = (pw: number, ph: number): [HTMLCanvasElement, CanvasRenderingContext2D] => {
      const cv = document.createElement('canvas');
      cv.width = pw;
      cv.height = ph;
      const c = cv.getContext('2d');
      if (!c) throw new Error('Canvas 2D indisponível');
      return [cv, c];
    };

    /** Pré-renderiza uma camada centrada em (0,0), com raio rMax, em 'lighter'. */
    const buildLayer = (rMax: number, paint: (c: CanvasRenderingContext2D) => void): Layer => {
      const scale = Math.min(1.5, 2048 / (2 * rMax));
      const px = Math.ceil(2 * rMax * scale);
      const [cv, c] = newCanvas(px, px);
      c.scale(scale, scale);
      c.translate(rMax, rMax);
      c.lineCap = 'round';
      c.globalCompositeOperation = 'lighter';
      paint(c);
      return { cv, rMax };
    };

    /** Fibras de plasma: arcos longos e suaves, quase concêntricos, com leve espiral para dentro. */
    const paintFilaments = (
      c: CanvasRenderingContext2D,
      R: number,
      count: number,
      pLo: number,
      pHi: number,
      wide: boolean
    ): void => {
      const N = 60;
      const rLo = radiusAt(R, pLo);
      const rHi = radiusAt(R, pHi) / 1.2;
      for (let i = 0; i < count; i++) {
        const r0 = lerp(rLo, rHi, Math.pow(rand(), 1.1));
        const sweep = 0.7 + rand() * 2.4;
        const drift = -0.22 + rand() * 0.3;
        const a0 = rand() * TAU;
        const q = rand();
        const fam = q < 0.45 ? 0 : q < 0.68 ? 1 : q < 0.84 ? 2 : q < 0.93 ? 3 : 4;
        const s1 = rand() * TAU;
        const s2 = rand() * TAU;
        const wd = (0.5 + rand() * 1.2) * (wide ? 1.5 : 1);
        const al = 0.22 + rand() * 0.45;
        const xs: number[] = [];
        const ys: number[] = [];
        const ps: number[] = [];
        for (let k = 0; k <= N; k++) {
          const f = k / N;
          let r = r0 * Math.exp(drift * f * sweep);
          r *= 1 + 0.012 * Math.sin(f * 9 + s1) + 0.006 * Math.sin(f * 23 + s2);
          const ang = a0 + f * sweep + 0.02 * Math.sin(f * 14 + s2);
          xs.push(Math.cos(ang) * r);
          ys.push(Math.sin(ang) * r);
          ps.push(clamp(Math.pow(clamp((r / R - 1.2) / 3.6, 0, 1), 1 / 1.4)));
        }
        for (let pass = 0; pass < 2; pass++) {
          for (let k = 1; k <= N; k++) {
            const fade = Math.sin((Math.PI * (k - 0.5)) / N);
            const a = Math.min(1, al * fade * (1 + (1 - ps[k]) * 0.3)) * (pass === 0 ? 0.14 : 1);
            c.lineWidth = pass === 0 ? wd * 3.4 : wd;
            c.strokeStyle = `rgba(${famColor(ps[k], fam)},${a.toFixed(3)})`;
            c.beginPath();
            c.moveTo(xs[k - 1], ys[k - 1]);
            c.lineTo(xs[k], ys[k]);
            c.stroke();
          }
        }
      }
    };

    /** Anel branco-lilás, com glow e arcos finos (textura de fibras girando). */
    const paintRing = (
      c: CanvasRenderingContext2D,
      R: number,
      count: number,
      glow: boolean
    ): void => {
      if (glow) {
        const rg = c.createRadialGradient(0, 0, R * 0.98, 0, 0, R * 2.1);
        rg.addColorStop(0, 'rgba(255,255,255,0.95)');
        rg.addColorStop(0.1, 'rgba(240,228,255,0.7)');
        rg.addColorStop(0.3, 'rgba(170,130,255,0.35)');
        rg.addColorStop(0.6, 'rgba(110,80,230,0.12)');
        rg.addColorStop(1, 'rgba(80,60,200,0)');
        c.fillStyle = rg;
        c.beginPath();
        c.arc(0, 0, R * 2.1, 0, TAU);
        c.fill();
      }
      for (let i = 0; i < count; i++) {
        const rr = R * (1.0 + Math.pow(rand(), 1.5) * 0.42);
        const a = rand() * TAU;
        const len = 0.15 + rand() * 1.3;
        const t = rand();
        c.strokeStyle = `rgba(${t < 0.5 ? '255,255,255' : t < 0.8 ? '220,200,255' : '190,215,255'},${(0.2 + rand() * 0.5).toFixed(2)})`;
        c.lineWidth = 0.5 + rand() * 1.4;
        c.beginPath();
        c.arc(0, 0, rr, a, a + len);
        c.stroke();
      }
    };

    /** Sprite de asteroide (lado iluminado = +x, depois girado para o buraco). */
    const makeRock = (): HTMLCanvasElement => {
      const [cv, c] = newCanvas(160, 160);
      const n = 22;
      const rr = Array.from({ length: n }, () => 62 * (0.78 + 0.22 * rand()));
      const pts = rr.map((_, i) => {
        const r = (rr[i] + rr[(i + 1) % n] + rr[(i + n - 1) % n]) / 3;
        const th = (i / n) * TAU;
        return [80 + Math.cos(th) * r, 80 + Math.sin(th) * r];
      });
      const outline = (): void => {
        const mid = (a: number[], b: number[]): number[] => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const m0 = mid(pts[n - 1], pts[0]);
        c.beginPath();
        c.moveTo(m0[0], m0[1]);
        for (let i = 0; i < n; i++) {
          const m = mid(pts[i], pts[(i + 1) % n]);
          c.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1]);
        }
        c.closePath();
      };
      const g = c.createLinearGradient(140, 80, 20, 80);
      g.addColorStop(0, '#5a52a0');
      g.addColorStop(0.35, '#1a1838');
      g.addColorStop(1, '#04040a');
      outline();
      c.fillStyle = g;
      c.fill();
      c.save();
      outline();
      c.clip();
      for (let i = 0; i < 7; i++) {
        const x = 40 + rand() * 80;
        const y = 40 + rand() * 80;
        const r = 5 + rand() * 14;
        c.fillStyle = 'rgba(0,0,0,0.35)';
        c.beginPath();
        c.arc(x, y, r, 0, TAU);
        c.fill();
        c.strokeStyle = 'rgba(170,150,255,0.18)';
        c.lineWidth = 1.2;
        c.beginPath();
        c.arc(x, y, r, -0.9, 0.9);
        c.stroke();
      }
      for (let i = 0; i < 180; i++) {
        c.fillStyle = rand() < 0.5 ? 'rgba(0,0,0,0.12)' : 'rgba(190,175,255,0.07)';
        c.fillRect(rand() * 160, rand() * 160, 1 + rand() * 2, 1 + rand() * 2);
      }
      c.restore();
      const sg = c.createLinearGradient(140, 80, 40, 80);
      sg.addColorStop(0, 'rgba(190,170,255,0.8)');
      sg.addColorStop(1, 'rgba(190,170,255,0)');
      outline();
      c.strokeStyle = sg;
      c.lineWidth = 2;
      c.stroke();
      return cv;
    };

    // ---------- elementos da cena (independem do tamanho da tela) ----------
    const sprites = Array.from({ length: 6 }, () => makeRock());
    const rocks: Rock[] = [];
    const addRocks = (n: number, sMin: number, sMax: number, rMin: number, rMax: number): void => {
      for (let i = 0; i < n; i++) {
        rocks.push({
          sp: Math.floor(rand() * sprites.length),
          a: (rocks.length * 2.399963) % TAU, // ângulo áureo: espalha bem
          r0: lerp(rMin, rMax, rand()),
          size: lerp(sMin, sMax, rand()),
          f: 0.6 + rand() * 0.4,
          ph: rand() * TAU
        });
      }
    };
    addRocks(2, 0.07, 0.1, 6.2, 7.2); // grandes, em primeiro plano
    addRocks(4, 0.035, 0.055, 5.4, 7.6);
    addRocks(7, 0.016, 0.028, 3.6, 7.8);
    addRocks(6, 0.007, 0.012, 2.6, 4.6); // detritos perto do anel

    const blobs = Array.from({ length: 7 }, () => ({
      x: rand(),
      y: rand(),
      r: 0.18 + rand() * 0.25,
      c: rand() < 0.5 ? '110,60,220' : '50,90,230'
    }));
    const twinkle = Array.from({ length: 90 }, () => ({
      x: rand(),
      y: rand(),
      s: 1 + rand() * 1.4,
      ph: rand() * TAU,
      sp: 0.0006 + rand() * 0.0018,
      c: rand() < 0.25 ? '255,200,160' : rand() < 0.5 ? '190,210,255' : '255,255,255'
    }));
    const flares = Array.from({ length: 6 }, () => ({ x: rand(), y: rand(), s: 6 + rand() * 8 }));
    const warp = Array.from({ length: 320 }, () => ({
      a: rand() * TAU,
      r: rand(),
      c: rand() < 0.5 ? '200,215,255' : rand() < 0.5 ? '255,255,255' : '190,160,255'
    }));

    // ---------- partes que dependem do tamanho da tela ----------
    let w = 0;
    let h = 0;
    let U = 1; // unidade de cena
    let R = 1; // raio do buraco negro
    let D = 1; // meia diagonal
    let layers: { layer: Layer; k: number }[] = [];
    let starsCv: HTMLCanvasElement | null = null;

    const build = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      U = Math.min(w, h * 1.6);
      R = U * 0.075;
      D = Math.hypot(w, h) / 2;

      const rOf = (p: number): number => radiusAt(R, p) * 1.3;
      layers = [
        { layer: buildLayer(rOf(0.4), (c) => paintFilaments(c, R, 60, 0.14, 0.4, false)), k: 7 },
        { layer: buildLayer(rOf(0.72), (c) => paintFilaments(c, R, 130, 0.22, 0.72, false)), k: 4.5 },
        {
          layer: buildLayer(rOf(1), (c) => {
            paintFilaments(c, R, 120, 0.5, 1, false);
            paintFilaments(c, R, 70, 0.8, 1, true); // borda irregular e brilhante do vórtice
          }),
          k: 2.6
        },
        { layer: buildLayer(R * 2.15, (c) => paintRing(c, R, 150, true)), k: 16 },
        { layer: buildLayer(R * 2.15, (c) => paintRing(c, R, 110, false)), k: -11 }
      ];

      // campo de estrelas fixo (milhares de pontos pequenos)
      const [sc, sctx] = newCanvas(Math.ceil(w * dpr), Math.ceil(h * dpr));
      sctx.scale(dpr, dpr);
      for (let i = 0; i < 2400; i++) {
        const t = rand();
        const col = t < 0.15 ? '255,205,170' : t < 0.5 ? '185,205,255' : '255,255,255';
        sctx.fillStyle = `rgba(${col},${(0.15 + rand() * 0.6).toFixed(2)})`;
        const s = rand() < 0.96 ? 0.7 : 1.5;
        sctx.fillRect(rand() * w, rand() * h, s, s);
      }
      starsCv = sc;
    };
    build();
    window.addEventListener('resize', build);

    // ---------- loop ----------
    let phase = 0;
    let tunPhase = 0;
    const t0 = performance.now();
    let last = t0;
    let raf = 0;
    let stopped = false;
    let ended = false;

    const stop = (): void => {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', build);
    };

    const frame = (now: number): void => {
      if (stopped) return;
      const dt = Math.min(50, now - last);
      last = now;
      const t = Math.max(0, now - t0);
      const u = Math.min(1, t / duration);
      const cx = w / 2;
      const cy = h / 2;

      // linha do tempo do salto
      const wp = smooth(0.38, 0.78, u); // dobra: estrelas esticam, giro acelera
      const pull = smooth(0.3, 0.8, u); // asteroides puxados para o buraco
      const dive = smooth(0.6, 0.93, u); // mergulho no buraco negro
      const tunnel = smooth(0.8, 0.93, u); // túnel de luz
      const flash = smooth(0.93, 1, u); // clarão final
      const vFade = 1 - 0.9 * smooth(0.74, 0.93, u); // o vórtice some durante o mergulho
      const Z = (1 + 0.1 * smooth(0, 0.6, u)) * Math.exp(Math.log(7) * Math.pow(dive, 2.2));
      const spin = SPEED * (1 + 6 * wp * wp);
      phase += dt * 0.00005 * spin;
      tunPhase += dt * 0.0006 * (0.5 + tunnel * 2);

      canvas.style.opacity = String(Math.min(1, u / 0.08));

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.setLineDash([]);
      ctx.lineCap = 'round';
      ctx.fillStyle = '#03040c';
      ctx.fillRect(0, 0, w, h);

      // nebulosas de fundo
      for (const b of blobs) {
        const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, b.r * U);
        g.addColorStop(0, `rgba(${b.c},0.14)`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // estrelas de dobra (viram riscos radiais durante a atração)
      ctx.globalCompositeOperation = 'lighter';
      for (const s of warp) {
        s.r += dt * (0.000004 + 0.0006 * wp * wp) * (0.25 + s.r);
        if (s.r > 1.05) {
          s.r = 0.02 + rand() * 0.08;
          s.a = rand() * TAU;
        }
        const d = s.r * D;
        const tail = wp * wp * d * 0.5 + 1;
        const al = (0.12 + 0.55 * Math.min(1, s.r * 1.8)) * (0.3 + 0.7 * wp);
        ctx.strokeStyle = `rgba(${s.c},${al.toFixed(2)})`;
        ctx.lineWidth = 0.6 + s.r * 1.4;
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(s.a) * Math.max(0, d - tail), cy + Math.sin(s.a) * Math.max(0, d - tail));
        ctx.lineTo(cx + Math.cos(s.a) * d, cy + Math.sin(s.a) * d);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';

      // ---------- cena com zoom (câmera avançando) ----------
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(Z, Z);
      ctx.translate(-cx, -cy);

      if (starsCv) ctx.drawImage(starsCv, 0, 0, w, h);
      for (const s of twinkle) {
        const a = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph));
        ctx.fillStyle = `rgba(${s.c},${a.toFixed(2)})`;
        ctx.fillRect(s.x * w, s.y * h, s.s, s.s);
      }
      for (const f of flares) {
        const k = 0.6 + 0.4 * Math.sin(t * 0.002 + f.x * 10);
        const x = f.x * w;
        const y = f.y * h;
        ctx.strokeStyle = `rgba(190,215,255,${(0.7 * k).toFixed(2)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - f.s * k, y);
        ctx.lineTo(x + f.s * k, y);
        ctx.moveTo(x, y - f.s * k);
        ctx.lineTo(x, y + f.s * k);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }

      // vórtice
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(TILT);
      ctx.scale(1, SQUASH);
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = vFade;
      const vg = ctx.createRadialGradient(0, 0, R, 0, 0, R * 5.6);
      vg.addColorStop(0, 'rgba(90,60,200,0)');
      vg.addColorStop(0.12, 'rgba(70,50,170,0.14)');
      vg.addColorStop(0.45, 'rgba(20,20,70,0.05)');
      vg.addColorStop(0.78, 'rgba(140,105,250,0.11)');
      vg.addColorStop(0.9, 'rgba(100,140,255,0.07)');
      vg.addColorStop(1, 'rgba(30,30,120,0)');
      ctx.fillStyle = vg;
      ctx.beginPath();
      ctx.arc(0, 0, R * 5.6, 0, TAU);
      ctx.fill();
      for (const l of layers) {
        ctx.save();
        ctx.rotate(phase * l.k);
        ctx.drawImage(l.layer.cv, -l.layer.rMax, -l.layer.rMax, 2 * l.layer.rMax, 2 * l.layer.rMax);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.01, 0, TAU);
      ctx.fill();
      ctx.restore();

      // asteroides (giram em torno do buraco e são puxados durante a atração)
      const cosT = Math.cos(TILT);
      const sinT = Math.sin(TILT);
      for (const k of rocks) {
        k.a += dt * 0.00003 * spin * (2.5 / Math.sqrt(k.r0));
        const r = k.r0 * (1 - 0.82 * pull * k.f);
        const alpha = clamp((r - 1.2) / 1.0);
        if (alpha <= 0) continue;
        const sz = k.size * U * (0.55 + (0.45 * r) / k.r0);
        const ex = Math.cos(k.a) * r * R;
        const ey = Math.sin(k.a) * r * R * SQUASH;
        const x = cx + ex * cosT - ey * sinT;
        const y = cy + ex * sinT + ey * cosT;
        ctx.save();
        ctx.globalAlpha = alpha * vFade;
        ctx.translate(x, y);
        ctx.rotate(Math.atan2(cy - y, cx - x) + 0.35 * Math.sin(t * 0.0004 + k.ph));
        ctx.drawImage(sprites[k.sp], -sz / 2, -sz / 2, sz, sz);
        ctx.restore();
      }
      ctx.restore(); // fim do zoom

      // vinheta
      const vig = ctx.createRadialGradient(cx, cy, U * 0.3, cx, cy, U * 0.85);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      // túnel de luz do salto
      if (tunnel > 0) {
        ctx.globalCompositeOperation = 'lighter';
        // luz no fim do túnel
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, D * (0.12 + 0.5 * tunnel * tunnel));
        core.addColorStop(0, `rgba(245,238,255,${(0.9 * tunnel).toFixed(3)})`);
        core.addColorStop(0.4, `rgba(170,130,255,${(0.35 * tunnel).toFixed(3)})`);
        core.addColorStop(1, 'rgba(110,80,230,0)');
        ctx.fillStyle = core;
        ctx.fillRect(0, 0, w, h);
        // anéis voando em direção à câmera (passada larga de brilho + passada fina)
        const nR = 14;
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 0; i < nR; i++) {
            const f = (tunPhase + i / nR) % 1;
            const rad = D * Math.pow(f, 2.4) + R * 0.5;
            const a = tunnel * Math.sin(Math.PI * f) * 0.8 * (pass === 0 ? 0.25 : 1);
            ctx.strokeStyle = `rgba(${str(mixC(VIOLET, WHITE_LILAC, f))},${a.toFixed(3)})`;
            ctx.lineWidth = (1 + f * f * 10) * (pass === 0 ? 3.5 : 1);
            ctx.beginPath();
            ctx.arc(cx, cy, rad, 0, TAU);
            ctx.stroke();
          }
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(225,210,255,${(0.35 * tunnel).toFixed(3)})`;
        for (let j = 0; j < 60; j++) {
          const ang = (j * TAU) / 60 + 0.3 * Math.sin(j * 12.9);
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(ang) * D * 0.08, cy + Math.sin(ang) * D * 0.08);
          ctx.lineTo(cx + Math.cos(ang) * D * (0.25 + 0.9 * tunnel), cy + Math.sin(ang) * D * (0.25 + 0.9 * tunnel));
          ctx.stroke();
        }
        ctx.globalCompositeOperation = 'source-over';
      }

      // clarão final
      if (flash > 0) {
        ctx.fillStyle = `rgba(235,225,255,${flash.toFixed(3)})`;
        ctx.fillRect(0, 0, w, h);
      }

      if (u >= 1) {
        ended = true;
        stop();
        this.zone.run(() => this.finish());
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => {
      // DIAGNÓSTICO (pode remover depois)
      if (!ended && !stopped) {
        console.warn(
          `[wormhole] interrompido aos ${Math.round(performance.now() - t0)}ms: a camada saiu de 'wormhole' antes do fim. Procure quem chama finishJump()/set()/navigate.`
        );
      }
      stop();
    };
  }

  private finish(): void {
    this.cosmic.finishJump();
    void this.router.navigate(['/deep-space']);
  }
}
