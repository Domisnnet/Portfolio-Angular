import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
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