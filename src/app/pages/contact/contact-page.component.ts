import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule,
    AngularFirestoreModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  contactData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private firestore: AngularFirestore) {}

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