import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-agregar-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-pelicula.component.html',
})
export class AgregarPeliculaComponent {
  pelicula: Pelicula = {
    titulo: '',
    genero: '',
    anio: new Date().getFullYear(),
    director: ''
  };

  constructor(private peliculasService: PeliculasService, private router: Router) {}

guardar() {
  if (this.pelicula.titulo && this.pelicula.director && this.pelicula.anio) {
    this.peliculasService.agregarPelicula(this.pelicula).then(() => {
      this.router.navigate(['/peliculas']); // ← Redirección aquí
    });
  }
}
}
