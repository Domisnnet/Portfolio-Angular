import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private firestore = inject(Firestore);
  private contactsRef = collection(this.firestore, 'contacts');
  getContacts(): Observable<ContactMessage[]> {
    const q = query(this.contactsRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<ContactMessage[]>;
  }

  async addContact(contact: ContactMessage) {
    return addDoc(this.contactsRef, {
      name: contact.name,
      email: contact.email,
      message: contact.message,
      createdAt: Date.now(),
    });
  }

  async deleteContact(id: string) {
    const ref = doc(this.firestore, `contacts/${id}`);
    return deleteDoc(ref);
  }
}
