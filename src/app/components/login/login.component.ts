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
    ButtonComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardEnterAnimation],
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  async loginEmail() {
    this.loading = true;
    try {
      await this.auth.loginEmail(this.email, this.password);
      alert('Login realizado com sucesso!');
      await this.router.navigate(['/admin']);
    } catch (err: any) {
      alert(this.getFriendlyError(err));
    } finally {
      this.loading = false;
    }
  }

  async loginGoogle() {
    this.loading = true;
    try {
      await this.auth.loginGooglePopup();
      alert('Login com Google realizado!');
      await this.router.navigate(['/admin']);
    } catch (err: any) {
      const code = err?.code;

      if (
        code === 'auth/popup-blocked' ||
        code === 'auth/cancelled-popup-request'
      ) {
        alert('Popup bloqueado. Usando redirecionamento...');
        await this.auth.loginGoogleRedirect();
        return;
      }

      if (code === 'auth/popup-closed-by-user') {
        alert('Você fechou o popup antes de concluir o login.');
        return;
      }

      alert(this.getFriendlyError(err));
    } finally {
      this.loading = false;
    }
  }

  private getFriendlyError(err: any): string {
    const code = err?.code || '';
    const map: Record<string, string> = {
      'auth/invalid-email': 'Email inválido.',
      'auth/wrong-password': 'Senha incorreta.',
      'auth/user-not-found': 'Usuário não encontrado.',
      'auth/user-disabled': 'Usuário desativado.',
      'auth/invalid-credential': 'Credenciais inválidas.',
      'auth/network-request-failed': 'Falha de rede. Verifique sua conexão.',
      'auth/account-exists-with-different-credential':
        'Já existe uma conta com este email usando outro provedor.',
    };
    return map[code] || err?.message || 'Ocorreu um erro inesperado.';
  }

  async logout() {
    this.loading = true;
    try {
      await this.auth.logout();
      alert('Sessão encerrada com sucesso.');
      await this.router.navigate(['/login']);
    } catch (err: any) {
      console.error('Erro ao sair:', err);
      alert('Falha ao encerrar a sessão.');
    } finally {
      this.loading = false;
    }
  }
}