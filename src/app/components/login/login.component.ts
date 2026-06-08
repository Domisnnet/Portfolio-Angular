import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { cardEnterAnimation } from '@app/components/card/card.animations';
import { AuthService } from '@app/services/auth.service';
import { ButtonComponent } from '@app/components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardEnterAnimation],
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  loginEmail() {
    this.auth.loginEmail(this.email, this.password)
      .then(() => {
        alert('Login realizado com sucesso!');
        this.router.navigate(['/admin']);
      })
      .catch((err) => {
        console.error('Erro no login:', err);
        alert('Erro: ' + err.message);
      });
  }

  loginGoogle() {
    this.auth.loginGooglePopup()
      .then(() => {
        alert('Login com Google realizado!');
        this.router.navigate(['/admin']);
      })
      .catch(async (err) => {
        console.error('Erro no login com Google:', err);
        if (
          err?.code === 'auth/popup-blocked' || err?.code === 'auth/cancelled-popup-request'
        ) {
          await this.auth.loginGoogleRedirect();
          return;
        }
        alert('Erro: ' + err.message);
      });
  }
}