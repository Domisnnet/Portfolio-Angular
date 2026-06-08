import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/components/button/button.component';
import { AuthService } from '@app/services/auth.service';
import { Firestore, collection, collectionData, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { cardEnterAnimation } from '@app/components/card/card.animations';

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
export class AdminPageComponent implements OnInit {
  contacts$?: Observable<any[]>;
  user: any;
  constructor(
    private firestore: Firestore,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const contactsRef = collection(this.firestore, 'contacts');
    this.contacts$ = collectionData(contactsRef, { idField: 'id' }) as Observable<any[]>;
    this.auth.getUser().subscribe((u) => (this.user = u));
  }

  deleteMessage(id: string) {
    const contactRef = doc(this.firestore, `contacts/${id}`);
    deleteDoc(contactRef)
      .then(() => alert('Mensagem excluída!'))
      .catch((err) => console.error('Erro ao excluir:', err));
  }

  logout() {
    this.auth.logout()
      .then(() => {
        alert('Logout realizado!');
      })
      .catch((err) => console.error('Erro no logout:', err));
  }
}