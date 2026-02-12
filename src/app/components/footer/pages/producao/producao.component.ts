import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-producao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producao.component.html',
  styleUrl: './producao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProducaoComponent {
  firebaseConfig = `{
    "hosting": [{
      "target": "portfolio",
      "public": "dist/portfolio",
      "ignore": [
        "firebase.json",
        "/**/.*",
        "/**/node_modules/**"
      ],
      "headers": [{
        "source": "/**.@",
        "headers": [{
          "key": "Cache-Control",
          "value": "max-age=31536000"
        }]
      }]
    }]
  }`;
}