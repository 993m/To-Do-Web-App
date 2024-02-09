import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';
  private expirationKey = 'expirationToken';
  private userEmail = 'userEmail';

  constructor(private http: HttpClient, private router: Router) {
  }

  setUser(token: string, expiration: number, email: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.expirationKey, expiration.toString());
    localStorage.setItem(this.userEmail, email);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getTokenExpiration(): number | null {
    const expiration = localStorage.getItem(this.expirationKey);
    return expiration ? +expiration : null;
  }

  getUserEmail() : string | null {
    return localStorage.getItem(this.userEmail);
  }

  clearUser() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
    localStorage.removeItem(this.userEmail);
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();

    if (!expiration) {
      return true;
    }

    return new Date().getTime() > expiration;
  }

  register(user: User): Observable<any> {
    return this.http.post<any>('https://localhost:7170/register', user);
  }

  login(user: User): Observable<any> {
    return this.http.post<any>('https://localhost:7170/login', user).pipe(
      tap(response => {
        const token = response.accessToken;
        const expiration = new Date().getTime() + response.expiresIn * 1000;
        this.setUser(token, expiration, user.email);

        this.router.navigate(['/tasks']);
      })
    );
  }
 
  logout() {
    this.clearUser();
  }

  isLoggedIn(): string | null {
    return this.getUserEmail();
  }

}
