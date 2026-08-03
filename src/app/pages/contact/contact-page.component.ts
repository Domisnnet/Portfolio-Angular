import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '@app/services/contact.service';
import { ButtonComponent } from '@app/components/button/button.component';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
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
  successMessage = '';
  errorMessage = '';
  constructor(private contactService: ContactService) {}

  async submitForm(form: NgForm): Promise<void> {
    this.successMessage = '';
    this.errorMessage = '';
    if (form.invalid) {
      Object.values(form.controls).forEach((control) => {
        control.markAsTouched();
      });
      this.errorMessage = 'Preencha corretamente todos os campos obrigatórios.';
      return;
    }

    this.loading = true;
    try {
      await this.contactService.addContact({
        name: this.name.trim(),
        email: this.email.trim(),
        message: this.message.trim(),
      });
      this.successMessage = 'Mensagem enviada com sucesso!';
      form.resetForm();
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      this.errorMessage = 'Não foi possível enviar sua mensagem. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
