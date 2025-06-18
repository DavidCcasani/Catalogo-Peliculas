import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-pelicula.component.html',
})
export class EditarPeliculaComponent implements OnInit {
  peliculaId: string = '';
  pelicula: Pelicula = {
    titulo: '',
    genero: '',
    anio: new Date().getFullYear(),
    director: ''
  };

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.peliculaId = this.route.snapshot.paramMap.get('id') || '';
    this.peliculasService.getPelicula(this.peliculaId).subscribe((pelicula: Pelicula) => {
      if (pelicula) {
        this.pelicula = pelicula;
      }
    });

  }

  guardarCambios() {
    this.peliculasService.editarPelicula(this.peliculaId, this.pelicula).then(() => {
      alert('Película actualizada correctamente');
      this.router.navigate(['/peliculas']);
    });
  }
}
