import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-astronauta',
  standalone: true,
  templateUrl: './astronauta.component.html',
  styleUrls: ['./astronauta.component.scss'],
})
export class AstronautaComponent implements AfterViewInit {
  @ViewChild('astro', { static: true }) astro!: ElementRef<HTMLDivElement>;
  private angle = Math.random() * Math.PI * 1;
  private radiusX = window.innerWidth * 0.4;
  private radiusY = window.innerHeight * 0.35;
  private centerX = window.innerWidth / 2;
  private centerY = window.innerHeight / 2;
  ngAfterViewInit() { this.animate(); }
  private animate = () => {
    const el = this.astro.nativeElement;
    this.angle += 0.001; // velocidade da órbita
    const x = this.centerX + Math.cos(this.angle) * this.radiusX;
    const y = this.centerY + Math.sin(this.angle) * this.radiusY;
    el.style.transform = `translate(${x}px, ${y}px) rotate(${this.angle}rad)`;
    requestAnimationFrame(this.animate);
  };
}