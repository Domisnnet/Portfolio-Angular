import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ButtonComponent } from '@app/components/button/button.component';
import { cardEnterAnimation } from '@app/components/card/card.animations';
import { AuthService } from '@app/services/auth.service';
import { ContactMessage, ContactService } from '@app/services/contact.service';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardEnterAnimation],
})
export class AdminPageComponent {
  private auth = inject(AuthService);
  private contactService = inject(ContactService);
  private router = inject(Router);
  contacts$ = this.contactService.getContacts();
  user$ = this.auth.user$;
  loading = false;

  trackByContactId(index: number, contact: ContactMessage): string {
    return contact.id ?? `${index}`;
  }

  deleteMessage(id: string): void {
    this.contactService.deleteContact(id)
      .then(() => alert('Mensagem excluída com sucesso!'))
      .catch((err) => {
        console.error('Erro ao excluir:', err);
        alert('Não foi possível excluir a mensagem.');
      });
  }

  async logout(): Promise<void> {
    this.loading = true;
    try {
      await this.auth.logout();
      alert('Sessão encerrada com sucesso!');
      await this.router.navigate(['/login']);
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
      alert('Não foi possível encerrar a sessão agora.');
    } finally {
      this.loading = false;
    }
  }
}