import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="usuario-page">
      <h2>🙋 Panel de Usuario</h2>
      <p>Bienvenido al área de usuario.</p>
    </div>
  `
})
export class UsuarioComponent {}
