import { Injectable } from '@angular/core';
import { Credential } from '../models/user/credential';
import { User } from '../models/user/User';
import { Token } from '../models/user/Token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiURL = 'https://red-social-spring-latest.onrender.com/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) {}

  postLogin(myCredential: Credential) {
    const body = {
      username: myCredential.email,
      password: myCredential.password
    };
    return this.http.post(`${this.apiURL}/auth/signin`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  createUser(myUser: User) {
    const body = {
      username: myUser.email,
      email: myUser.email,
      password: myUser.password,
      role: ['user']
    };
    return this.http.post(`${this.apiURL}/auth/signup`, body, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
