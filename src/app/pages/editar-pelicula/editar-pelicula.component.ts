import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-pelicula',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
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
  ) {}

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
}
