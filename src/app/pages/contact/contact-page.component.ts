import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '@app/services/contact.service';
import { ButtonComponent } from '@app/components/button/button.component';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [cardEnterAnimation],
})
export class ContactPageComponent {
  name = '';
  email = '';
  message = '';
  loading = false;
  constructor(private contactService: ContactService) {}
  async submitForm() {
    this.loading = true;
    try {
      await this.contactService.addContact({
        name: this.name,
        email: this.email,
        message: this.message,
      });

      alert('Mensagem enviada com sucesso!');
      this.name = '';
      this.email = '';
      this.message = '';
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
      alert('Não foi possível enviar sua mensagem. Tente novamente.');
    } finally {
      this.loading = false;
    }
  }
}