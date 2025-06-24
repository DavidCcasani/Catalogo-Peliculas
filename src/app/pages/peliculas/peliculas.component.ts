import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router'; 
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peliculas',
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];
  generos: string[] = ['Todos'];
  generoSeleccionado: string = 'Todos';
  criterioOrden: string = 'titulo';
  busqueda: string = '';
  loading: boolean = true;
  errorCarga: boolean = false;

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.errorCarga = false;

    this.peliculasService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;

        // Obtener géneros únicos dinámicamente
        const generosUnicos = new Set(data.map(p => p.genero?.trim()));
        this.generos = ['Todos', ...Array.from(generosUnicos)];

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar películas:', err);
        this.errorCarga = true;
        this.loading = false;
      }
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

  get peliculasFiltradas(): Pelicula[] {
    const texto = this.busqueda.toLowerCase();

    let resultado = this.peliculas.filter(p =>
      (this.generoSeleccionado === 'Todos' || p.genero === this.generoSeleccionado) &&
      (
        p.titulo.toLowerCase().includes(texto) ||
        p.genero.toLowerCase().includes(texto) ||
        p.director.toLowerCase().includes(texto) ||
        p.anio.toString().includes(texto)
      )
    );

    // Ordenar
    if (this.criterioOrden === 'titulo') {
      resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } else if (this.criterioOrden === 'anio') {
      resultado.sort((a, b) => b.anio - a.anio); // más reciente primero
    }

    return resultado;
  }
}
