import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('User');

  isLoggedIn$ = this.loggedIn.asObservable();
  username$ = this.username.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (token && user?.name) {
      this.loggedIn.next(true);
      this.username.next(user.name);
    }
  }

  login(userData: any) {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify({ name: userData.name }));
    this.loggedIn.next(true);
    this.username.next(userData.name);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.username.next('User');
  }
}
