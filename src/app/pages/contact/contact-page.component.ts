import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('cardEnter', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(12px)'
        }),
        animate(
          '280ms cubic-bezier(.2,.8,.2,1)',
          style({
            opacity: 1,
            transform: 'none'
          })
        )
      ])
    ])
  ]
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