
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { PeliculaDetalleComponent } from './pages/pelicula-detalle/pelicula-detalle.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'peliculas', loadChildren: () => import('./pages/peliculas/peliculas.routes').then((m) => m.routes),},
  { path: 'pelicula/:id', loadChildren: () => import('./pages/pelicula-detalle/pelicula-detalle.routes').then((m) => m.routes),},
  { path: 'agregar', loadChildren: () => import('./pages/agregar-pelicula/agregar-pelicula.routes').then((m) => m.routes),},
  { path: 'editar/:id', loadChildren: () => import('./pages/editar-pelicula/editar-pelicula.routes').then((m) => m.routes),},
  { path: 'admin', component: AdminComponent, canActivate: [roleGuard('admin')] },
  { path: 'usuario', component: UsuarioComponent, canActivate: [roleGuard('usuario')] },
  { path: '**', component: NotFoundComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  
];