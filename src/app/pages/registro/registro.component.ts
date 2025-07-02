import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // ✅ importa tu servicio

@Component({
  standalone: true,
  selector: 'app-registro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  correo = '';
  contrasena = '';
  rol = 'usuario'; // Puedes cambiar a 'admin' si deseas

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

registrar() {
  const rolPorDefecto = 'usuario'; // o 'admin' si es para ti

  this.authService.registrar(this.correo, this.contrasena, rolPorDefecto)
    .then(() => {
      alert('Registro exitoso');
      this.router.navigate(['/peliculas']);
    })
    .catch(err => {
      alert('❌ Error al registrarse: ' + err.message);
      console.error(err);
    });
}

}
