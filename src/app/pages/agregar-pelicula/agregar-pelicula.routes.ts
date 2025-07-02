import { Routes } from '@angular/router';
import { AgregarPeliculaComponent } from './agregar-pelicula.component';
import { roleGuard } from '../../guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: AgregarPeliculaComponent,
    canActivate: [roleGuard('admin')]
  }
];
