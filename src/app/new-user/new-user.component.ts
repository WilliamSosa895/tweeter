import { Component } from '@angular/core';
import { AuthService, SignupPayload } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  myPayloadUser: SignupPayload = {
    username: '',
    email:    '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  createUser() {
    this.auth.signup(this.myPayloadUser).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        alert('Error al registrar usuario');
        console.error('Signup error', err);
      }
    });
  }
}
