import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  OrderResponse,
  PageProductRequest,
  Product,
  UserResponse,
} from 'src/app/models';
import {
  ProductService,
  LayoutService,
  OrderService,
  LoadingService,
  AlertService,
  UserService,
  CategoryService,
} from 'src/app/services';
import {
  BehaviorSubject,
  Subscription,
  debounceTime,
  finalize,
  forkJoin,
  switchMap,
  tap,
} from 'rxjs';
import { Page } from 'src/app/models';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];
  users: UserResponse[] = [];
  products: Product[] = [];
  pageProduct!: Page<Product>;
  orders: OrderResponse[] = [];
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;
  pageProductRequest: PageProductRequest = {
    page: 1,
    limit: 5,
    sort_by: 'sold',
    sort_dir: 'desc',
    category_id: null,
    keyword: '',
  };
  pageProductRequestSubject = new BehaviorSubject<PageProductRequest>(
    this.pageProductRequest
  );
  constructor(
    private productService: ProductService,
    public layoutService: LayoutService,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private userService: UserService,
    private categoryService: CategoryService
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initChart();
      });
  }

  ngOnInit() {
    this.initChart();
    this.loadingService.show();
    forkJoin({
      orders: this.getAllOrders(),
      users: this.getAllUsers(),
    })
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: ({ orders, users }) => {
          this.orders = orders.data;
          this.users = users.data.filter(
            (user: UserResponse) => user.role_id == 1
          );
        },
        error: (err) => {
          this.alertService.error(err.message);
        },
      });
    this.pageProductRequestSubject
      .pipe(
        switchMap((req) => {          
          this.loadingService.show();
          return this.productService.getAllProducts(req);
        }),
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: ({ data }) => {
          this.pageProduct = data;
          this.products = data.contents;
          this.loadingService.hide();
        },
        error: ({ error }) => {
          this.alertService.error(error.message);
        },
      });
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: 0.4,
        },
      ],
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
  getAllProducts() {
    this.pageProductRequestSubject.next(this.pageProductRequest);
    return this.productService.getAllProducts(this.pageProductRequest);
  }
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }
  getAllOrders() {
    return this.orderService.getAllOrders();
  }
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  getRevenue(): number {
    return this.orders.reduce((total, item) => total + item.totalMoney, 0) ?? 0;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onPageChange(event: PageEvent): void {
    this.pageProductRequest = {
      ...this.pageProductRequest,
      page: event.first,
      limit: event.rows,
    };
    this.pageProductRequestSubject.next(this.pageProductRequest);
  }
  handleChangePage(value: number): void {
    this.pageProductRequest = {
      ...this.pageProductRequest,
      page: this.pageProductRequest.page + value,
    };
    this.pageProductRequestSubject.next(this.pageProductRequest);
  }
}
