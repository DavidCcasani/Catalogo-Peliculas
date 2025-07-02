import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <h2>👑 Panel de Administrador</h2>
      <p>Bienvenido al área de administración.</p>
    </div>
  `
})
export class AdminComponent {}
