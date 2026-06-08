import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { ButtonComponent } from '@app/components/button/button.component';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardEnterAnimation],
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  email = '';
  password = '';
  async loginEmail(): Promise<void> {
    try {
      await this.auth.loginEmail(
        this.email,
        this.password
      );
      await this.router.navigate([
        '/admin'
      ]);
    } catch (error: any) {
      console.error(
        'Erro no login:',
        error
      );
      alert(
        error?.message ??
        'Erro ao realizar login.'
      );
    }
  }

  async loginGoogle(): Promise<void> {
    try {
      await this.auth.loginGooglePopup();
      await this.router.navigate([
        '/admin'
      ]);
    } catch (error: any) {
      console.error(
        'Erro no login Google:',
        error
      );

      alert(
        error?.message ??
        'Erro ao realizar login com Google.'
      );
    }
  }
}