import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from '@angular/fire/auth';

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

  constructor(private router: Router) {}

  registrar() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.correo, this.contrasena)
      .then(() => {
        this.router.navigate(['/peliculas']);
      })
      .catch(err => alert('Error al registrarse: ' + err.message));
  }
}
