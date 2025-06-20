import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  password: string = '';
  confirmPassword: string = '';
  error: string = '';
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.paramMap.get('email') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  reset() {
    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      this.message = '';
      return;
    }

    this.authService.reset(this.email, this.token, this.password).subscribe({
      next: () => {
        this.message = 'Contraseña restablecida exitosamente. Redirigiendo al login...';
        this.error = '';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: err => {
        this.error = err.error.message || 'Error al restablecer la contraseña.';
        this.message = '';
      }
    });
  }
}
