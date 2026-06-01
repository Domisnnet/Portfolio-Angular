import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  contacts$: Observable<any[]> | undefined;
  user: any;
  constructor(private firestore: AngularFirestore, public auth: AuthService) {}
  ngOnInit() {
    this.contacts$ = this.firestore.collection('contacts').valueChanges({ idField: 'id' });
    this.auth.getUser().subscribe(u => this.user = u);
  }

  deleteMessage(id: string) {
    this.firestore.collection('contacts').doc(id).delete()
      .then(() => alert('Mensagem excluída!'))
      .catch(err => console.error('Erro ao excluir:', err));
  }

  logout() {
    this.auth.logout().then(() => alert('Logout realizado!'));
  }
}