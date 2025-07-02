import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { CloudinaryService } from '../../services/cloudinary.service'; // 👈
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-agregar-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './agregar-pelicula.component.html',
  styleUrls: ['./agregar-pelicula.component.css']
})
export class AgregarPeliculaComponent {
  formulario: FormGroup;
  errorMsg: string = '';
  mostrarToast: boolean = false;  
  
  imagenURL: string = ''; // 👈 Imagen subida


  constructor(
    private fb: FormBuilder,
    private peliculasService: PeliculasService,
    private cloudinary: CloudinaryService, // 👈
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

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.cloudinary.subirImagen(file)
      .then((url: string) => {
        this.imagenURL = url;
        this.formulario.patchValue({ imagen: url }); // ✅ Actualiza el campo "imagen"
      })
      .catch((err: any) => {
        this.errorMsg = 'Error al subir imagen';
        console.error(err);
      });
  }
}


  guardar() {
    if (this.formulario.valid) {
      this.peliculasService.agregarPelicula(this.formulario.value).then(() => {
        this.mostrarToast = true;
        setTimeout(() => {
          this.mostrarToast = false;
          this.router.navigate(['/peliculas']);
        }, 2000);
      }).catch(err => {
        this.errorMsg = 'Error al guardar: ' + err.message;
        setTimeout(() => this.errorMsg = '', 4000);
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
