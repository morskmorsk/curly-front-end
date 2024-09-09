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

  // Get the cart total
  getCartTotal(): Observable<{ total: number }> {
    return this.http.get<{ total: number }>(`${environment.apiUrl}/total/`);
  }

  // Mark the payment as credit card (processed on external terminal)
  markAsCreditCardPayment(): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/credit-card/`, {});  // Adjust URL for backend
  }

  // Process the cash payment, only send tendered amount
  processCashPayment(tendered: number): Observable<any> {
    const body = { tendered_amount: tendered };
    return this.http.post(`${this.apiUrl}/payment/cash/`, body);  // Adjust URL for backend
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/`);
  }

  addToCart(productId: number, quantity: number, overridePrice: number | null): Observable<any> {
    const body = {
      product_id: productId,
      quantity: quantity,
      override_price: overridePrice
    };
    return this.http.post(`${this.apiUrl}/carts/add_item/`, body);
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

// ////////////////////////////////////////////
  addDevice(deviceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/devices/`, deviceData);
  }

  addWorkOrder(workOrderData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/work-orders/`, workOrderData);
  }

  addWorkOrderDevice(workOrderDeviceData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/work-order-devices/`, workOrderDeviceData);
  }

  addPhoneNumber(phoneNumberData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/phone-numbers/`, phoneNumberData);
  }

  getWorkOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/work-orders/`);
  }

  getWorkOrderDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/work-order-devices/`);
  }

  getPhoneNumbers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/phone-numbers/`);
  }

  getDevices(): Observable<any> {
    return this.http.get(`${this.apiUrl}/devices/`);
  }
  
  updateDevice(deviceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/devices/${deviceData.id}/`, deviceData);
  }

  updateWorkOrder(workOrderData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/work-orders/${workOrderData.id}/`, workOrderData);
  }

  updateWorkOrderDevice(workOrderDeviceData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/work-order-devices/${workOrderDeviceData.id}/`, workOrderDeviceData);
  }

  updatePhoneNumber(phoneNumberData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/phone-numbers/${phoneNumberData.id}/`, phoneNumberData);
  }

  updateLocation(locationData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/locations/${locationData.id}/`, locationData);
  }

  updateDepartment(departmentData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/departments/${departmentData.id}/`, departmentData);
  }

  updateProduct(productData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${productData.id}/`, productData);
  }

  deleteDevice(deviceId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/devices/${deviceId}/`);
  }
}
// //////////////////////////////////////////// 
