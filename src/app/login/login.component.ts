// File: src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router }    from '@angular/router';
import { AuthService, LoginPayload, JwtToken } from '../services/auth.service';
import { StorageService }                   from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username     = '';
  password     = '';
  loading      = false;
  showPassword = false;

  constructor(
    private auth: AuthService,
    private storage: StorageService,
    private router: Router
  ) {}

  callLogin(): void {
    if (!this.username.trim() || !this.password) {
      alert('Completa usuario y contraseña');
      return;
    }
    this.loading = true;
    const payload: LoginPayload = {
      username: this.username,
      password: this.password
    };
    this.auth.signin(payload).subscribe({
      next: (tok: JwtToken) => {
        this.storage.setSession(tok);
        this.router.navigate(['/home']);
      },
      error: () => {
        alert('Credenciales inválidas');
        this.loading = false;
      }
    });
  }
}






/*import { Component } from '@angular/core';
import { AuthService, LoginPayload, JwtToken } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username    = '';
  password    = '';
  showPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  callLogin() {
    const payload: LoginPayload = {
      username: this.username.trim(),
      password: this.password
    };
    this.auth.signin(payload).subscribe({
      next: (token: JwtToken) => {
        sessionStorage.setItem('token', token.accessToken);
        sessionStorage.setItem('user', JSON.stringify(token));
        this.router.navigate(['/home']);
      },
      error: err => {
        alert('Usuario o contraseña incorrectos');
        console.error('Login error', err);
      }
    });
  }
}*/