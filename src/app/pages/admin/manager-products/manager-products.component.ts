import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Category, Param, Product } from 'src/app/models';
import {
  AlertService,
  CategoryService,
  LoadingService,
  ProductService,
} from 'src/app/services';

@Component({
  selector: 'app-manager-products',
  templateUrl: './manager-products.component.html',
  styleUrls: ['./manager-products.component.scss'],
})
export class ManagerProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  param: Param = {
    page: 1,
    limit: 10,
    sortBy: 'id',
    sortDir: 'asc',
  };
  keyword: string = '';
  numberOfElements!: number;
  totalPages!: number;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  getAllProducts() {
    this.loadingService.show();
    this.productService.getAllProducts(this.keyword, this.param).subscribe({
      next: ({ data }) => {
        data.contents.forEach(
          (product: Product) =>
            (product.productUrl = `${environment.apiBaseUrl}products/images/${product.thumbnail}`)
        );
        this.products = data.contents;
        this.totalPages = data.totalPages;
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }

  getAllCategories() {
    this.loadingService.show();
    this.categoryService.getAllCategories().subscribe({
      next: ({ data }) => {
        this.categories = data;
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
      complete: () => {
        this.loadingService.hide();
      },
    });
  }
  getCategoryById(categoryId: number): string {
    return this.categories.find((category) => category.id == categoryId)?.name!;
  }
  handleChangePage(value: number) {
    this.param = { ...this.param, page: this.param.page! + value };
    this.getAllProducts();
  }
  handleChangeKeyword() {
    this.param = { ...this.param, page: 1 };
    this.getAllProducts();
  }
}
