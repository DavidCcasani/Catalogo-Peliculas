import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'generoEmoji', standalone: true })
export class GeneroEmojiPipe implements PipeTransform {
  transform(genero: string): string {
    const mapa: { [key: string]: string } = {
      accion: '💥',
      comedia: '😂',
      drama: '🎭',
      terror: '👻',
      romance: '❤️',
      cienciaficcion: '🚀'
    };
    return `${mapa[genero.toLowerCase()] || '🎬'} ${genero}`;
  }
}
