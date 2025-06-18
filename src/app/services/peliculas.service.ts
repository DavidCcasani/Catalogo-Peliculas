import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  constructor(private firestore: Firestore) {}

  getPeliculas(): Observable<Pelicula[]> {
    const peliculasRef = collection(this.firestore, 'peliculas');
    return collectionData(peliculasRef, { idField: 'id' }) as Observable<Pelicula[]>;
  }
}
