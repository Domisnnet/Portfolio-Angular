import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  private firestore = inject(AngularFirestore);

  contactData = {
    name: '',
    email: '',
    message: ''
  };

  onSubmit() {
    this.firestore.collection('contacts').add(this.contactData)
      .then(() => {
        alert('Mensagem salva com sucesso!');
        this.contactData = { name: '', email: '', message: '' };
      })
      .catch(err => {
        console.error('Erro ao salvar mensagem:', err);
        alert('Ocorreu um erro, tente novamente.');
      });
  }
}
