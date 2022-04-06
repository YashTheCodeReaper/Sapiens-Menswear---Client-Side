import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallproducts`);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getProduct/${id}`);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallcategories`);
  }

  getAllCombos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallcombos`);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerUser`, user);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUser/${id}`);
  }

  validateUserLogin(token: string): Observable<any> {
    if (!token) {
      return this.http.get(`${this.apiUrl}/validateUserLogin/notoken`);
    }
    return this.http.get(`${this.apiUrl}/validateUserLogin/${token}`);
  }

  loginUser(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginUser`, user);
  }

  getUserCart(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUserCart/${id}`);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateUser/${id}`, user);
  }

  updateUserCart(id: string, cartItem: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateUserCart`, {
      id: id,
      cartItem: cartItem,
    });
  }

  insertUserCart(id: string, cart: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertUserCart/${id}`, cart);
  }

  getUserOrders(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUserOrders/${id}`);
  }

  getCombo(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getCombo/${name}`);
  }
}
