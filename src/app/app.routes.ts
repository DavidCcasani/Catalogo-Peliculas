// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { PeliculaDetalleComponent } from './pages/pelicula-detalle/pelicula-detalle.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'pelicula/:id', component: PeliculaDetalleComponent },
  { path: 'agregar', loadComponent: () => import('./pages/agregar-pelicula/agregar-pelicula.component').then(m => m.AgregarPeliculaComponent) },
  { path: 'editar/:id', loadComponent: () => import('./pages/editar-pelicula/editar-pelicula.component').then(m => m.EditarPeliculaComponent) },
  { path: '**', component: NotFoundComponent }, // ← ESTA VA AL FINAL
];