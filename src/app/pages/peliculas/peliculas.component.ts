import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router'; 
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-peliculas',
  standalone: true, 
  imports: [CommonModule,FormsModule, RouterModule,  ], // 👈 importa lo necesario
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css'
})
export class PeliculasComponent implements OnInit {
  peliculas: Pelicula[] = [];

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
busqueda: string = '';
generoSeleccionado: string = 'Todos';


get peliculasFiltradas(): Pelicula[] {
  const texto = this.busqueda.toLowerCase();
  return this.peliculas.filter(p =>
    (this.generoSeleccionado === 'Todos' || p.genero === this.generoSeleccionado) &&
    (
      p.titulo.toLowerCase().includes(texto) ||
      p.genero.toLowerCase().includes(texto) ||
      p.director.toLowerCase().includes(texto) ||
      p.anio.toString().includes(texto)
    )
  );
}



}
