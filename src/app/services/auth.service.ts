import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, UserCredential } from '@angular/fire/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {
    this.initializePersistence();
  }

  private async initializePersistence(): Promise<void> {
    try {
      await setPersistence(
        this.auth,
        browserLocalPersistence
      );
    } catch (error) {
      console.error(
        'Erro ao configurar persistência:',
        error
      );
    }
  }

  async loginEmail(
    email: string,
    password: string
  ): Promise<UserCredential> {
    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async loginGooglePopup(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    return signInWithPopup(
      this.auth,
      provider
    );
  }

  async loginGoogleRedirect(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    return signInWithRedirect( this.auth, provider );
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  getUser(): Observable<User | null> {
    return new Observable<User | null>(
      (subscriber) => {
        const unsubscribe =
          onAuthStateChanged(
            this.auth,
            (user) => subscriber.next(user),
            (error) => subscriber.error(error)
          );
        return unsubscribe;
      }
    );
  }
}