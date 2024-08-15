import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderResponse, Product } from 'src/app/models';
import {
  LoadingService,
  OrderService,
  ProductService,
  TokenService,
} from 'src/app/services';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderResponse[] = [];
  constructor(
    private orderService: OrderService,
    private loadindService: LoadingService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login']);
    } else this.getOrdersByUserId(this.getUserId());
  }
  getOrdersByUserId(userId: number) {
    this.loadindService.show();
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: ({ data }: any) => {
        this.orders = data;
      },
      error: ({ error }: any) => console.log(error),
      complete: () => this.loadindService.hide(),
    });
  }
  getUserId() {
    return this.tokenService.getUserId();
  }
}
