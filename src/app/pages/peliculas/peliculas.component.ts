import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 para *ngIf y *ngFor
import { RouterModule, Router } from '@angular/router'; // 👈 para routerLink
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';


@Component({
  selector: 'app-peliculas',
  standalone: true, // 👈 standalone true
  imports: [CommonModule, RouterModule], // 👈 importa lo necesario
  templateUrl: './peliculas.component.html',
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
}
