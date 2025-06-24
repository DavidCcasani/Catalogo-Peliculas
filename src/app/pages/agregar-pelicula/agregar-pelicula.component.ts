import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-agregar-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './agregar-pelicula.component.html',
  styleUrls: ['./agregar-pelicula.component.css']
})
export class AgregarPeliculaComponent {
  formulario: FormGroup;
  errorMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private peliculasService: PeliculasService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      genero: ['', Validators.required],
      anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      director: ['', Validators.required],
      imagen: ['', Validators.required],
      descripcion: ['']
    });
  }

  guardar() {
    if (this.formulario.valid) {
      this.peliculasService.agregarPelicula(this.formulario.value).then(() => {
        this.router.navigate(['/peliculas']);
      }).catch(err => {
        this.errorMsg = 'Error al guardar: ' + err.message;
        setTimeout(() => this.errorMsg = '', 4000); // Ocultar mensaje tras 4 segundos
      });
    } else {
      this.errorMsg = 'Completa todos los campos requeridos';
      setTimeout(() => this.errorMsg = '', 3000);
    }
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
