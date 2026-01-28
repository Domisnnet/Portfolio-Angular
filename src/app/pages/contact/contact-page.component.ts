import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  private firestore: Firestore = inject(Firestore);
  
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  async onSubmit() {
    try {
      const contactsCollection = collection(this.firestore, 'contacts');
      await addDoc(contactsCollection, this.contactData);
      alert('Mensagem salva com sucesso!');
      this.contactData = { name: '', email: '', message: '' };
    } catch (err) {
      console.error('Erro ao salvar mensagem:', err);
      alert('Ocorreu um erro, tente novamente.');
    }
  }
}