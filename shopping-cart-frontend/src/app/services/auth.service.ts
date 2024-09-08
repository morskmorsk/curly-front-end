// src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getCsrfToken(): string | null {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  }

  // login(username: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}/token/`, { username, password })
  //     .pipe(map(response => {
  //       const user = {
  //         username: response.username,
  //         is_staff: response.is_staff,
  //         refresh: response.refresh,
  //         access: response.access
  //       };
  //       localStorage.setItem('currentUser', JSON.stringify(user));
  //       this.currentUserSubject.next(user);
  //       return user;
  //     }));
  // }

  // signup(username: string, password: string) {
  //   return this.http.post<any>(`${environment.apiUrl}/register/`, { username, password })
  //     .pipe(map(response => {
  //       return response;
  //     }));
  // }

  login(username: string, password: string) {
    const csrfToken = this.getCsrfToken();
    const headers = { 'X-CSRFToken': csrfToken || '' };
  
    return this.http.post<any>(`${environment.apiUrl}/token/`, { username, password }, { headers })
      .pipe(map(response => {
        const user = {
          username: response.username,
          is_staff: response.is_staff,
          refresh: response.refresh,
          access: response.access
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  
  signup(username: string, password: string) {
    const csrfToken = this.getCsrfToken();
    const headers = { 'X-CSRFToken': csrfToken || '' };
  
    return this.http.post<any>(`${environment.apiUrl}/register/`, { username, password }, { headers })
      .pipe(map(response => {
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  refreshToken() {
    const currentUser = this.currentUserValue;
    if (currentUser && currentUser.refresh) {
      return this.http.post<any>(`${environment.apiUrl}/token/refresh/`, { refresh: currentUser.refresh })
        .pipe(map(response => {
          const updatedUser = { ...currentUser, access: response.access };
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
          return response;
        }));
    }
    return new Observable(subscriber => subscriber.complete());
  }
}
