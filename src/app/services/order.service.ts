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

  constructor(private apiService: ApiService) {}
  insertOrder(orderRequest: OrderRequest) {
    return this.apiService.post(`${this.apiOrderUrl}`, orderRequest);
  }
  getOrderById(id: number) {
    return this.apiService.get(`${this.apiOrderUrl}/${id}`);
  }
  getOrdersByUserId(userId: number) {
    return this.apiService.get(`${this.apiOrderUrl}/users/${userId}`);
  }
  
}
