import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
})
export class AppComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private router: Router,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    // Detecta automáticamente si el usuario ya inició sesión
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('✅ Usuario autenticado:', user.uid);

        // Solo redirige si está en raíz o login
        if (this.router.url === '/' || this.router.url === '/login' || this.router.url === '/home') {
          this.router.navigate(['/peliculas']);
          
        }
      }
    });
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigate(['/login']));
  }
}
