import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  register(userData: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).toPromise();
  }

  login(credentials: any): Promise<any> {
    // Temporary for tests
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        this.setLoggedIn(true);
        resolve(true);
      }, 3000);
    });

    return this.http.post(`${this.apiUrl}/login`, credentials).toPromise()
      .then(() => {
        this.setLoggedIn(true);
      })
      .catch(error => {
        console.error('Erro ao fazer login', error);
        throw error;
      });
  }

  logout() {
    this.setLoggedIn(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private setLoggedIn(status: boolean) {
    this.isAuthenticated.next(status);
  }
}