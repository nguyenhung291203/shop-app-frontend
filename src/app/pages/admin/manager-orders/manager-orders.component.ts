import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { OrderResponse, PageOrderRequest } from 'src/app/models';
import { AlertService, LoadingService, OrderService } from 'src/app/services';

@Component({
  selector: 'app-manager-orders',
  templateUrl: './manager-orders.component.html',
  styleUrls: ['./manager-orders.component.scss'],
})
export class ManagerOrdersComponent implements OnInit {
  orders: OrderResponse[] = [];
  pageOrderRequest: PageOrderRequest = {
    keyword: '',
    page: 1,
    limit: 10,
    sort_by: 'id',
    sort_dir: 'asc',
  };
  total: number = 0;
  pageOrderRequest$ = new BehaviorSubject<PageOrderRequest>(
    this.pageOrderRequest
  );
  isShowDialogEditOrder: boolean = false;

  constructor(
    private orderService: OrderService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.pageOrderRequest$
      .pipe(
        switchMap((req) => {
          return this.orderService.findAllOrders(req);
        })
      )
      .subscribe({
        next: ({ data, message }: any) => {
          this.orders = data.contents;
          this.total = data.totalPages;
          this.loadingService.hide();
        },
        error: ({ error }) => {
          this.loadingService.hide();
          this.alertService.error(error.message);
        },
      });
  }
  restRequest(): void {
    this.pageOrderRequest$.next(this.pageOrderRequest);
  }
  handleChangePage(value: number): void {
    if (this.pageOrderRequest.page + value <= 0) {
      return;
    }
    this.pageOrderRequest = {
      ...this.pageOrderRequest,
      page: this.pageOrderRequest.page + value,
    };
    this.restRequest();
  }
  handleChangeKeyword(): void {
    this.pageOrderRequest = {
      ...this.pageOrderRequest,
      keyword: this.pageOrderRequest.keyword,
      page: 1,
    };
    this.restRequest();
  }
}
