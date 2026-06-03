import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User, setPersistence, browserLocalPersistence } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private auth: Auth) {
    setPersistence(this.auth, browserLocalPersistence);
  }

  loginEmail(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
    console.log(email, password);
  }

  loginGoogle() {
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
      });
      return { unsubscribe };
    });
  }
}