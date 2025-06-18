import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 IMPORTANTE

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule], // 👈 AÑADIR ESTO
  templateUrl: './peliculas.component.html',
})
export class PeliculasComponent {
  peliculas = [
    {
      titulo: 'Inception',
      descripcion: 'Un ladrón que roba secretos a través de los sueños.',
      anio: 2010
    },
    {
      titulo: 'Interstellar',
      descripcion: 'Un viaje a través del espacio y el tiempo.',
      anio: 2014
    }
  ];
}
