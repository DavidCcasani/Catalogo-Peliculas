import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  constructor(private firestore: Firestore) {}

  getCategorias(): Observable<Categoria[]> {
    const ref = collection(this.firestore, 'categorias');
    return collectionData(ref, { idField: 'id' }) as Observable<Categoria[]>;
  }

  agregarCategoria(categoria: Categoria) {
    const ref = collection(this.firestore, 'categorias');
    return addDoc(ref, categoria);
  }

  actualizarCategoria(id: string, categoria: Categoria) {
    const ref = doc(this.firestore, `categorias/${id}`);
    return updateDoc(ref, { ...categoria });
  }

  eliminarCategoria(id: string) {
    const ref = doc(this.firestore, `categorias/${id}`);
    return deleteDoc(ref);
  }
}
