import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

export const roleGuard = (expectedRole: string): CanActivateFn => {
  return async () => {
    const auth = inject(Auth);
    const firestore = inject(Firestore);
    const router = inject(Router);

    const user = auth.currentUser;
    if (!user) {
      router.navigate(['/login']);
      return false;
    }

    const userRef = doc(firestore, `usuarios/${user.uid}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();
      if (data['rol'] === expectedRole) {
        return true;
      }
    }

    router.navigate(['/unauthorized']); // crea una página de acceso denegado
    return false;
  };
};
