// src/app/pages/editar-pelicula/editar-pelicula.routes.ts
import { Routes } from '@angular/router';
import { EditarPeliculaComponent } from './editar-pelicula.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: EditarPeliculaComponent,
    canActivate: [authGuard],
  },
];
