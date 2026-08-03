import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, user } from '@angular/fire/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  readonly user$ = user(this.auth);
  constructor() {
    void setPersistence(this.auth, browserLocalPersistence);
  }
  async loginEmail(email: string, password: string) { return signInWithEmailAndPassword(this.auth, email, password); }
  async loginGooglePopup() { const provider = new GoogleAuthProvider(); return signInWithPopup(this.auth, provider); }
  async loginGoogleRedirect() { const provider = new GoogleAuthProvider(); return signInWithRedirect(this.auth, provider); }
  async logout() { return signOut(this.auth); }
}
