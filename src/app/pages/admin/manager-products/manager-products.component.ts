import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, forkJoin, switchMap } from 'rxjs';
import { Category, PageProductRequest, Param, Product } from 'src/app/models';
import { AlertService, LoadingService, ProductService } from 'src/app/services';

@Component({
  selector: 'app-manager-products',
  templateUrl: './manager-products.component.html',
  styleUrls: ['./manager-products.component.scss'],
})
export class ManagerProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  visibleInsertProduct: boolean = false;
  pageProductRequest: PageProductRequest = {
    keyword: '',
    category_id: null,
    limit: 5,
    page: 1,
    sort_by: 'id',
    sort_dir: 'desc',
  };
  pageProductRequestSubject = new BehaviorSubject<PageProductRequest>(
    this.pageProductRequest
  );
  keyword: string = '';
  numberOfElements!: number;
  totalPages!: number;
  cols: any[] = [];

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
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
          this.products = data.contents;
          this.totalPages = data.totalPages;
          this.loadingService.hide();
        },
        error: ({ error }) => {
          this.alertService.error(error.message);
          this.loadingService.hide();
        },
      });
  }

  getAllProducts() {
    this.pageProductRequestSubject.next(this.pageProductRequest);
  }

  handleChangePage(value: number) {
    this.pageProductRequest = {
      ...this.pageProductRequest,
      page: this.pageProductRequest.page! + value,
    };
    this.getAllProducts();
  }
  handleChangeKeyword() {
    this.pageProductRequest = {
      ...this.pageProductRequest,
      keyword: this.pageProductRequest.keyword,
      page: 1,
    };
    this.getAllProducts();
  }
  restParam() {
    this.pageProductRequest = {
      keyword: '',
      category_id: null,
      limit: 5,
      page: 1,
      sort_by: 'id',
      sort_dir: 'asc',
    };
    this.pageProductRequestSubject.next(this.pageProductRequest);
  }
  closeModelInsert(event: boolean) {
    if (event === false) {
      this.restParam();
    }
  }
  deleteProductById(product: Product) {
    this.alertService
      .confirm(
        `Bạn thực sự muốn xóa sản phẩm ${product.name}`,
        'Bạn sẽ không thể hoàn nguyên điều này!'
      )
      .then((res) => {
        if (res.isConfirmed) {
          this.loadingService.show();
          this.productService.deleteProductById(product.id).subscribe({
            next: () => {
              this.alertService.success(
                `Đã xóa sản phẩm ${product.name} thành công`
              );
            },
            error: ({ error }) => {
              this.alertService.error(error.message);
              this.loadingService.hide();
            },
            complete: () => {
              this.loadingService.hide();
              this.restParam();
            },
          });
        }
      });
  }
}
