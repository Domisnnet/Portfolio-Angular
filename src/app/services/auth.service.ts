import { Injectable, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { browserLocalPersistence, setPersistence } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  readonly user$ = user(this.auth);
  private async ensurePersistence(): Promise<void> {
    await setPersistence(
      this.auth,
      browserLocalPersistence
    );
  }

  async loginEmail(
    email: string,
    password: string
  ) {
    await this.ensurePersistence();

    return signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async loginGooglePopup() {
    await this.ensurePersistence();
    const provider = new GoogleAuthProvider();
    return signInWithPopup(
      this.auth,
      provider
    );
  }

  async logout() {
    return signOut(this.auth);
  }
}