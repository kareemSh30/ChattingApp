import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Iusers } from '../interfaces/Iusers';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:5001/api/';

  currentUser = signal<Iusers | null>(null);

  loadCurrentUser() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser.set(JSON.parse(storedUser));
    }
  }

  login(creds: any) {
    return this.http.post<Iusers>(this.baseUrl + 'account/login', creds).pipe(
      tap((user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      }))
    );
  }

  register(model: any) {
    return this.http.post<Iusers>(this.baseUrl + 'account/register', model).pipe(
      tap((user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      }))
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
