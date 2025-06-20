// File: src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.storage.getSession()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
