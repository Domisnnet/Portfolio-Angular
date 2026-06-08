import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  loginGoogleRedirect() {
    throw new Error('Method not implemented.');
  }
  constructor(private auth: Auth) {}
  private async ensurePersistence() {
    await setPersistence(this.auth, browserLocalPersistence);
  }

  async loginEmail(email: string, password: string) {
    await this.ensurePersistence();
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginGooglePopup() {
    await this.ensurePersistence();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser(): Observable<User | null> {
    return new Observable<User | null>((subscriber) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        (user) => subscriber.next(user),
        (error) => subscriber.error(error)
      );
      return unsubscribe;
    });
  }
}