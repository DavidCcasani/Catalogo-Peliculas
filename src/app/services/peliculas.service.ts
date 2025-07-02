import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula.model';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  constructor(private firestore: Firestore) { }

  // Leer todas las películas
  getPeliculas(): Observable<Pelicula[]> {
    const peliculasRef = collection(this.firestore, 'peliculas');
    return collectionData(peliculasRef, { idField: 'id' }) as Observable<Pelicula[]>;
  }

  // Leer una sola película
  getPelicula(id: string): Observable<Pelicula> {
    const peliculaDoc = doc(this.firestore, `peliculas/${id}`);
    return docData(peliculaDoc, { idField: 'id' }) as Observable<Pelicula>;
  }

  // Crear una nueva película
  agregarPelicula(pelicula: Pelicula) {
    const Ref = collection(this.firestore, 'peliculas');
    return addDoc(Ref, pelicula); // esto devuelve una Promise
  }

  // Actualizar una película existente
  actualizarPelicula(id: string, pelicula: Pelicula) {
    const peliculaDoc = doc(this.firestore, `peliculas/${id}`);
    return updateDoc(peliculaDoc, { ...pelicula });
  }

  eliminarPelicula(id: string) {
    const docRef = doc(this.firestore, `peliculas/${id}`);
    return deleteDoc(docRef);
  }

  // Obtener película por ID
  getPeliculaPorId(id: string): Observable<Pelicula> {
    const docRef = doc(this.firestore, `peliculas/${id}`);
    return docData(docRef) as Observable<Pelicula>;
  }

  // Editar película
  editarPelicula(id: string, datos: Pelicula) {
    const docRef = doc(this.firestore, `peliculas/${id}`);
    return updateDoc(docRef, { ...datos });
  }


}
