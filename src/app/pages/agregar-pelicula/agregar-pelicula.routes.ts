
import { Routes } from '@angular/router';
import { AgregarPeliculaComponent } from './agregar-pelicula.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AgregarPeliculaComponent,
    canActivate: [authGuard],
  },
];
