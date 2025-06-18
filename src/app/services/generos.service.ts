import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Genero } from '../models/genero.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenerosService {
  constructor(private firestore: Firestore) {}

  getGeneros(): Observable<Genero[]> {
    const generoRef = collection(this.firestore, 'generos');
    return collectionData(generoRef, { idField: 'id' }) as Observable<Genero[]>;
  }
}
