import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { OrderResponse, Product, UserResponse } from 'src/app/models';
import {
  ProductService,
  LayoutService,
  OrderService,
  LoadingService,
  AlertService,
  UserService,
} from 'src/app/services';
import { Subscription, debounceTime } from 'rxjs';
import { environment } from 'src/app/environments/environments';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  items!: MenuItem[];
  users: UserResponse[] = [];
  products: Product[] = [];
  orders: OrderResponse[] = [];
  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  constructor(
    private productService: ProductService,
    public layoutService: LayoutService,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.subscription = this.layoutService.configUpdate$
      .pipe(debounceTime(25))
      .subscribe((config) => {
        this.initChart();
      });
  }

  ngOnInit() {
    this.initChart();
    this.getAllProducts();
    this.getAllOrders();
    this.getAllUsers();
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
    this.loadingService.show();
    this.productService.getAllProducts().subscribe({
      next: ({ data, message }) => {
        data.contents.forEach(
          (product: Product) =>
            (product.productUrl = `${environment.apiBaseUrl}products/images/${product.thumbnail}`)
        );
        this.products = data.contents;
        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
    });
  }
  getAllOrders() {
    this.loadingService.show();
    this.orderService.getAllOrders().subscribe({
      next: ({ data }) => {
        this.orders = data;
        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
    });
  }
  getAllUsers() {
    this.loadingService.show();
    this.userService.getAllUsers().subscribe({
      next: ({ data }) => {
        this.users = data.filter((user: UserResponse) => user.role_id === 1);
        console.log(this.users);

        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
    });
  }
  getRevenue(): number {
    return this.orders.reduce((total, item) => total + item.totalMoney, 0);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
