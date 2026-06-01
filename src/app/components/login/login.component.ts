import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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