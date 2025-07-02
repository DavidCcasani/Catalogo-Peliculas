import { Routes } from '@angular/router';
import { EditarPeliculaComponent } from './editar-pelicula.component';
import { roleGuard } from '../../guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: EditarPeliculaComponent,
    canActivate: [roleGuard('admin')]
  }
];