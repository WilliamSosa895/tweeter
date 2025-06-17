// File: src/app/services/storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private key = 'session';

  setSession(session: any): void {
    localStorage.setItem(this.key, JSON.stringify(session));
  }

  getSession(): any {
    const str = localStorage.getItem(this.key);
    return str ? JSON.parse(str) : null;
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
