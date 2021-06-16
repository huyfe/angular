import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  url = 'http://localhost:3000/auth/';
  token: any = localStorage.getItem('userData');
  constructor(private http: HttpClient) { }

  public isAuthenticated(): boolean {
    const jwtHelper = new JwtHelperService();
    if (this.token === '')
      return false;
    return !jwtHelper.isTokenExpired(this.token);
  }

  signUp(email: string, password: string) {
    return this.http.post(this.url + 'register', {
      "email": email,
      "password": password,
      "typeUser": 0
    })

  }
  signIn(email: string, password: string) {
    return this.http.post<any>(this.url + 'login', {
      "email": email,
      "password": password
    })
  }
  setToken(token: string) {
    localStorage.setItem('userData', token);
  }
  getToken() {
    return localStorage.getItem('userData');
  }

}
