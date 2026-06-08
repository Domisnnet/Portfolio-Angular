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

  async loginEmail(): Promise<void> {
    try {
      await this.auth.loginEmail(
        this.email,
        this.password
      );
      this.router.navigate(['/admin']);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  async loginGoogle(): Promise<void> {
    try {
      await this.auth.loginGooglePopup();
  
      this.router.navigate(['/admin']);
    } catch (err: any) {
      console.error(err);
      if (
        err?.code === 'auth/popup-blocked' ||
        err?.code === 'auth/cancelled-popup-request'
      ) {
        await this.auth.loginGoogleRedirect();
        return;
      }
      alert(err.message);
    }
  }
}