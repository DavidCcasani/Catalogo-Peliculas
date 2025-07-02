import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PeliculasService } from '../../services/peliculas.service';
import { Pelicula } from '../../models/pelicula.model';
import { CapitalizarPipe } from '../../pipes/capitalizar.pipe'; 
import { EstrenoPipe } from '../../pipes/estreno.pipe';
import { GeneroEmojiPipe } from '../../pipes/genero-emoji.pipe';

@Component({
  selector: 'app-pelicula-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizarPipe, EstrenoPipe, GeneroEmojiPipe],
  templateUrl: './pelicula-detalle.component.html',
  styleUrls: ['./pelicula-detalle.component.css']
})
export class PeliculaDetalleComponent implements OnInit {
  pelicula?: Pelicula;
  id?: string;

  constructor(
    private route: ActivatedRoute,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.peliculasService.getPelicula(this.id).subscribe(data => {
        this.pelicula = data;
      });
    }
  }
}
