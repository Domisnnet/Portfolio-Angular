import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@app/components/button/button.component';
import { cardEnterAnimation } from '@app/components/card/card.animations';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule,
    ButtonComponent
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ cardEnterAnimation ]
})
export class ContactPageComponent {
  private firestore = inject(Firestore);
  isSubmitting = false; 
  contactData = { name: '', email: '', message: '' };

  async onSubmit() {
    if (this.isSubmitting) return; 
    this.isSubmitting = true;

    try {
      const contactsCollection = collection(this.firestore, 'contacts');
      await addDoc(contactsCollection, this.contactData);
      alert('Mensagem salva com sucesso!');
      this.contactData = { name: '', email: '', message: '' };

    } catch (err) {
      console.error('Erro ao salvar mensagem:', err);
      alert('Ocorreu um erro, tente novamente.');
    } finally {
      this.isSubmitting = false; 
    }
  }
}