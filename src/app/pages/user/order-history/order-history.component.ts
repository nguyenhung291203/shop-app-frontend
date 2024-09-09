import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderResponse, Param, Product } from 'src/app/models';
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
  statusCurrent: string = 'ALL';
  param: Param = {
    page: 1,
    limit: 5,
    sortBy: 'id',
    sortDir: 'asc',
  };

  constructor(
    private orderService: OrderService,
    private loadindService: LoadingService,
    private tokenService: TokenService,
  ) {}
  ngOnInit(): void {
    this.findByUserIdAndKeyword(this.getUserId(), '', this.param);
  }
  getOrdersByUserId(userId: number) {
    this.loadindService.show();
    this.orderService.getOrdersByUserId(userId).subscribe({
      next: ({ data }: any) => {
        console.log(data);

        this.orders = data;
      },
      error: ({ error }: any) => console.log(error),
      complete: () => this.loadindService.hide(),
    });
  }
  findByUserIdAndKeyword(userId: number, keyword: string, param: Param) {
    this.loadindService.show();
    this.orderService.findByUserIdAndKeyword(userId, keyword, param).subscribe({
      next: ({ data }: any) => {
        console.log(data);
        this.orders = data.contents;
      },
      error: ({ error }: any) => console.log(error),
      complete: () => this.loadindService.hide(),
    });
  }
  getUserId() {
    return this.tokenService.getUserId();
  }
  handleChangeStatusCurrent(value: string) {
    this.statusCurrent = value;
    this.findByUserIdAndKeyword(this.getUserId(), value, this.param);
  }

}
