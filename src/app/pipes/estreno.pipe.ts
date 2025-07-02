import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estreno',
  standalone: true
})
export class EstrenoPipe implements PipeTransform {
  transform(anio: number): string {
    const anioActual = new Date().getFullYear();
    return anio == anioActual ? 'Estreno' : anio.toString();
  }
}
