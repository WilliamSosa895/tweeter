// src/app/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ¡SOLO añade el token si NO es una imagen ni archivo!
    if (
      req.url.includes('/uploads/') ||     // <-- ARCHIVOS
      req.url.endsWith('.png')  ||         // <-- Imágenes directas (extra seguro)
      req.url.endsWith('.jpg')  ||
      req.url.endsWith('.jpeg') ||
      req.url.endsWith('.gif')
    ) {
      return next.handle(req);
    }

    const session = this.storage.getSession();
    const token = session?.token || session?.accessToken;
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
