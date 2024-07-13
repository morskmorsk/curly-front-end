// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/`);
  }

  addToCart(productId: number, quantity: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/carts/add_item/`, { product_id: productId, quantity });
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/carts/`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/checkout/`, {});
  }
}