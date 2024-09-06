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

  removeFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/carts/remove_item/?item_id=${itemId}`);
  }

  checkout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders/checkout/`, {});
  }

  getLocations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/locations/`);
  }

  getDepartments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/departments/`);
  }

  addLocation(locationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations/`, locationData);
  }

  addDepartment(departmentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/departments/`, departmentData);
  }

  addProduct(productData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/`, productData);
  }

  updatePriceOverride(itemId: number, overridePrice: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/carts/update_price_override/`, { item_id: itemId, override_price: overridePrice });
  }
}
