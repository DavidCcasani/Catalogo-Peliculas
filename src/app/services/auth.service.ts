import { Injectable } from '@angular/core';
import {
  Auth,
  signOut,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  Firestore,
  doc,
  setDoc,
  getDoc
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;
  private rolSubject = new BehaviorSubject<string | null>(null); // 👈 Rol reactivo
  rol$ = this.rolSubject.asObservable(); // 👈 Observable para suscribirse

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      this.user = user;
      if (user) {
        const userRef = doc(this.firestore, `usuarios/${user.uid}`);
        const snap = await getDoc(userRef);
        const rol = snap.exists() ? snap.data()['rol'] : null;
        this.rolSubject.next(rol); // 👈 actualiza el rol
      } else {
        this.rolSubject.next(null);
      }
    });
  }

  getUser() {
    return this.user;
  }

  getRol() {
    return this.rolSubject.value;
  }

  logout() {
    return signOut(this.auth).then(() => {
      this.router.navigate(['/login']);
    });
  }

  async registrar(email: string, password: string, rol: string = 'usuario') {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);

    const userRef = doc(this.firestore, `usuarios/${cred.user.uid}`);
    await setDoc(userRef, {
      uid: cred.user.uid,
      email: cred.user.email,
      rol: rol
    });

    this.user = cred.user;
    this.rolSubject.next(rol); // 👈 actualiza rol después de registrar

    return cred;
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    this.user = cred.user;

    const userRef = doc(this.firestore, `usuarios/${cred.user.uid}`);
    const snap = await getDoc(userRef);
    const rol = snap.exists() ? snap.data()['rol'] : null;
    this.rolSubject.next(rol); // 👈 actualiza el rol después de login

    return cred;
  }
}
