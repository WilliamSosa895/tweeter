import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  resetPassword() {
    if (!this.email.trim()) {
      alert('Por favor, ingresa un correo válido');
      return;
    }

    this.authService.forgot(this.email).subscribe({
      next: () => {
        alert('Te hemos enviado un correo con las instrucciones para restablecer tu contraseña.');
        this.router.navigate(['/login']);
      },
      error: err => {
        alert('No se pudo enviar el correo. Intenta más tarde.');
        console.error('Error al enviar email:', err);
      }
    });
  }
}
