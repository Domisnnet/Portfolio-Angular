import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cardEnterAnimation } from '@app/components/card/card.animations';
import { ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@app/components/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent, 
    CommonModule
  ], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private auth: AuthService, private router: Router) {}
  loginEmail() {
    this.auth.loginEmail(this.email, this.password)
      .then(() => {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/admin']);
      })
      .catch(err => alert('Erro: ' + err.message));
  }
  loginGoogle() {
    this.auth.loginGoogle()
      .then(() => {
        alert('Login com Google realizado!');
        this.router.navigate(['/admin']);
      })
      .catch(err => alert('Erro: ' + err.message));
  }
}