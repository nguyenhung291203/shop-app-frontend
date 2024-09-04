import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {
  Category,
  OrderResponse,
  Param,
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
import { Subscription, debounceTime } from 'rxjs';
import { environment } from 'src/app/environments/environments';
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
  categories: Category[] = [];
  chartData: any;
  chartOptions: any;
  subscription!: Subscription;
  param: Param = {
    page: 1,
    limit: 5,
    sortBy: 'sold',
    sortDir: 'desc',
  };

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
    this.getAllProducts();
    this.getAllOrders();
    this.getAllUsers();
    this.getAllCategories();
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
  getAllCategories() {
    this.loadingService.show();
    this.categoryService.getAllCategories().subscribe({
      next: ({ data, message }) => {
        this.categories = data;
        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
    });
  }
  getAllProducts() {
    this.loadingService.show();
    this.productService.getAllProducts('', this.param).subscribe({
      next: ({ data, message }) => {
        data.contents.forEach(
          (product: Product) =>
            (product.productUrl = `${environment.apiBaseUrl}products/images/${product.thumbnail}`)
        );
        this.pageProduct = {
          ...data,
          content: data.contents,
        };
        // this.products = data.contents;
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
        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
    });
  }
  getCategoryById(categoryId: number): string {
    return this.categories.find((category) => category.id == categoryId)?.name!;
  }
  getRevenue(): number {
    return this.orders.reduce((total, item) => total + item.totalMoney, 0);
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onPageChange(event: PageEvent) {
    this.param = { ...this.param, page: event.first, limit: event.rows };
  }
  handleChangePage(value: number) {
    this.param = { ...this.param, page: this.param.page! + value };
    this.getAllProducts();
  }
}
