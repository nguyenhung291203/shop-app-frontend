import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { OrderRequest } from '../models';
import { environment } from '../environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiOrderUrl: string = `orders`;
  private orders: Map<number, number> = new Map();
  constructor(private apiService: ApiService) {
    const stored = localStorage.getItem('orders');
    if (stored) this.orders = new Map(JSON.parse(stored));
  }
  insertOrder(orderRequest: OrderRequest) {
    return this.apiService.post(`${this.apiOrderUrl}`, orderRequest);
  }
  getOrderById(id: number) {
    return this.apiService.get(`${this.apiOrderUrl}/${id}`);
  }
  getOrdersByUserId(userId: number) {
    return this.apiService.get(`${this.apiOrderUrl}/users/${userId}`);
  }
  getOrdersFromLocalStorage() {
    return this.orders;
  }
  changeQuantityOrder(productId: number, quantity: number = 1) {
    this.orders.set(productId, this.orders.get(productId)! + quantity);
    this.saveOrdersToLocalStorage();
  }
  insertOrderToLocalStorage(productId: number, quantity: number = 1) {
    if (this.orders.has(productId)) this.removeOrder(productId);
    else this.orders.set(productId, quantity);
    this.saveOrdersToLocalStorage();
  }
  removeOrder(productId: number) {
    this.orders.delete(productId);
    this.saveOrdersToLocalStorage();
  }
  removeAllOrder() {
    this.orders.clear();
    this.saveOrdersToLocalStorage();
  }
  private saveOrdersToLocalStorage(): void {
    localStorage.setItem(
      'orders',
      JSON.stringify(Array.from(this.orders.entries()))
    );
  }
}
