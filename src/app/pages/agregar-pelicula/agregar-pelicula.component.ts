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
  styleUrls: ['./agregar-pelicula.component.css']
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
    this.peliculasService.agregarPelicula(this.pelicula).then(() => {
      alert('Película guardada con éxito');
      this.router.navigate(['/peliculas']);
    }).catch(err => {
      alert('Error al guardar: ' + err.message);
    });
  }
}
