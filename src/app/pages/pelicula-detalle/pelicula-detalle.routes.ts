import { Routes } from '@angular/router';
import { PeliculaDetalleComponent } from './pelicula-detalle.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PeliculaDetalleComponent,
    canActivate: [authGuard],
  },
];
