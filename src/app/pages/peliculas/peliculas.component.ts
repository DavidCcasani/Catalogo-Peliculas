import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ← AÑADIR
import { RouterModule, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // ← AÑADIR FormsModule
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];

  // NUEVOS CAMPOS PARA FORMULARIO
  mostrarFormulario = false;
  peliculaNueva: Pelicula = {
    titulo: '',
    genero: '',
    anio: new Date().getFullYear(),
    director: ''
  };

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.peliculasService.getPeliculas().subscribe((data) => {
      this.peliculas = data;
    });
  }

  editar(id: string | undefined) {
    if (id) this.router.navigate(['/editar', id]);
  }

  eliminar(id: string) {
    if (confirm('¿Estás seguro de eliminar esta película?')) {
      this.peliculasService.eliminarPelicula(id)
        .then(() => console.log('Película eliminada'))
        .catch((error) => console.error('Error al eliminar:', error));
    }
  }

  guardar() {
    const p = this.peliculaNueva;
    if (p.titulo && p.genero && p.anio && p.director) {
      this.peliculasService.agregarPelicula(p).then(() => {
        this.mostrarFormulario = false;
        this.peliculaNueva = {
          titulo: '',
          genero: '',
          anio: new Date().getFullYear(),
          director: ''
        };
      });
    }
  }
}
