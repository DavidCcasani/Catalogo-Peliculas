
import { Routes } from '@angular/router';
import { PeliculasComponent } from './peliculas.component';
import { authGuard } from '../../guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: PeliculasComponent,
    canActivate: [authGuard], 
  },
];
