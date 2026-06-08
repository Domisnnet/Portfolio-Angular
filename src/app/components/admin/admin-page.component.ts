import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, collectionData, deleteDoc, doc, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ButtonComponent } from '@app/components/button/button.component';
import { AuthService } from '@app/services/auth.service';
import { cardEnterAnimation } from '@app/components/card/card.animations';

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
}

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
export class AdminPageComponent {
  private readonly firestore = inject(Firestore);
  readonly auth = inject(AuthService);
  readonly user$ = this.auth.user$;
  readonly contacts$: Observable<Contact[]> =
    collectionData(
      collection(
        this.firestore,
        'contacts'
      ),
      {
        idField: 'id',
      }
    ) as Observable<Contact[]>;
  async deleteMessage(
    id: string
  ): Promise<void> {
    try {
      await deleteDoc(
        doc(
          this.firestore,
          'contacts',
          id
        )
      );

      alert('Mensagem excluída!');
    } catch (error) {
      console.error(
        'Erro ao excluir mensagem:',
        error
      );
    }
  }

  async logout(): Promise<void> {
    try {
      await this.auth.logout();
    } catch (error) {
      console.error(
        'Erro ao realizar logout:',
        error
      );
    }
  }
}