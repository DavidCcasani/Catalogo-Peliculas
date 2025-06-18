export interface Pelicula {
  id?: string;
  titulo: string;
  descripcion: string;
  anio: number;
  generoId: string;
  imagenUrl: string;
  destacada: boolean;
}
