import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';
import { RouterModule } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class EditarPeliculaComponent implements OnInit {
  peliculaId: string = '';
  formulario!: FormGroup;
  mostrarToast = false;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.peliculaId = this.route.snapshot.paramMap.get('id') || '';
    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      genero: ['', Validators.required],
      anio: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
      director: ['', Validators.required],
      descripcion: [''],
      imagen: ['']
    });

    this.peliculasService.getPelicula(this.peliculaId).subscribe((pelicula: Pelicula) => {
      if (pelicula) {
        this.formulario.patchValue(pelicula);
      }
    });
  }

  guardarCambios() {
    if (this.formulario.valid) {
      this.peliculasService.editarPelicula(this.peliculaId, this.formulario.value).then(() => {
        this.mostrarToast = true;
        setTimeout(() => {
          this.mostrarToast = false;
          this.router.navigate(['/peliculas']);
        }, 2000);
      }).catch(err => {
        alert('Error al actualizar: ' + err.message);
      });
    } else {
      alert('Completa todos los campos correctamente');
    }
  }

  subiendoImagen: boolean = false;

  uploadImage(event: Event) {
    const archivo = (event.target as HTMLInputElement).files?.[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('upload_preset', 'Imagenes');

    fetch('https://api.cloudinary.com/v1_1/dbezo9ehh/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('✅ Imagen subida:', data.secure_url);
        this.formulario.patchValue({ imagen: data.secure_url });
        console.log('🔄 Nuevo valor imagen:', this.formulario.get('imagen')?.value);
      })
      .catch(err => {
        console.error('❌ Error al subir imagen:', err);
        alert('Error al subir la imagen');
      });
  }
}
