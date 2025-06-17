import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface SignupPayload {
  username: string;
  email:    string;
  password: string;
}

export interface JwtToken {
  accessToken: string;
  tokenType:   string;
  id:          number;
  username:    string;
  email:       string;
  roles:       string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'https://red-social-spring-latest.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  signin(payload: LoginPayload): Observable<JwtToken> {
    return this.http.post<JwtToken>(`${this.base}/signin`, payload);
  }

  signup(payload: SignupPayload): Observable<any> {
    return this.http.post(`${this.base}/signup`, payload);
  }

  forgot(email: string): Observable<any> {
    return this.http.post(`${this.base}/forgot`, { email });
  }

  reset(email: string, token: string, pwd: string): Observable<any> {
    return this.http.post(`${this.base}/reset`, { email, token, password: pwd });
  }
}
