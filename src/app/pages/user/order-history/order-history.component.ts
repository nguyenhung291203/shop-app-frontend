import { Component, OnInit, HostListener } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { OrderResponse, PageOrderRequest, Param } from 'src/app/models';
import { LoadingService, OrderService, TokenService } from 'src/app/services';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orders: OrderResponse[] = [];
  statusCurrent: string | null = 'ALL';

  pageOrderRequest: PageOrderRequest = {
    keyword: '',
    limit: 2,
    page: 1,
    sort_by: 'id',
    sort_dir: 'asc',
    status: null,
  };
  totalElements!: number;
  private pageOrderRequest$ = new BehaviorSubject<PageOrderRequest>(
    this.pageOrderRequest
  );
  constructor(
    private orderService: OrderService,
    private loadindService: LoadingService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.pageOrderRequest$
      .pipe(
        switchMap((pageRequest) => {
          return this.orderService.getOrdersByUserId(
            this.getUserId(),
            pageRequest
          );
        })
      )
      .subscribe({
        next: ({ data }: any) => {          
          this.totalElements = data.totalElements;
          this.orders = data.contents;
          const orders = this.orders;
        },
        error: ({ error }: any) => console.log(error),
        complete: () => this.loadindService.hide(),
      });
  }
  updateRequest(): void {
    this.pageOrderRequest$.next(this.pageOrderRequest);
  }
  getUserId() {
    return this.tokenService.getUserId();
  }
  handleChangeStatusCurrent(value: string | null) {
    this.statusCurrent = value;
    if (value == 'ALL') {
      value = null;
    }
    this.pageOrderRequest = {
      ...this.pageOrderRequest,
      status: value,
    };
    this.updateRequest();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    if (this.pageOrderRequest.limit >= this.totalElements) {
      return;
    }
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight) {
      this.pageOrderRequest = {
        ...this.pageOrderRequest,
        limit: this.pageOrderRequest.limit + 1,
      };
      this.updateRequest();
    }
  }
}
