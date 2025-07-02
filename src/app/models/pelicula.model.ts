export interface Pelicula {
  id?: string;
  titulo: string;
  director: string;
  genero: string;
  anio: number;
  imagen?: string; 
  descripcion?: string;
  calificacion?: number;
}
