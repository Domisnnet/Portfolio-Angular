import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User, browserLocalPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {}
  async loginEmail(email: string, password: string) {
    await setPersistence(this.auth, browserLocalPersistence);
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginGoogle() {
    await setPersistence(this.auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser(): Observable<User | null> {
    return new Observable<User | null>((subscriber) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        subscriber.next(user);
      }, (error) => subscriber.error(error));
      return unsubscribe;
    });
  }
}