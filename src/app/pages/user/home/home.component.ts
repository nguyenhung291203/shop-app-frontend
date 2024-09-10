import { Component, OnInit } from '@angular/core';
import { DiscountPipe } from 'src/app/pipe/discount.pipe';
import { Product, Category, Param, PageProductRequest } from 'src/app/models';
import {
  LoadingService,
  ProductService,
  CategoryService,
  AlertService,
} from 'src/app/services';
import { BehaviorSubject, forkJoin, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DiscountPipe],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  totalPages: number = 0;
  search: string = '';
  isOpenDropDown: boolean = false;

  pageProductRequest: PageProductRequest = {
    category_id: null,
    keyword: '',
    page: 1,
    limit: 12,
    sort_by: 'id',
    sort_dir: 'asc',
  };
  private pageRequestSubject = new BehaviorSubject<PageProductRequest>(
    this.pageProductRequest
  );
  selects: [[string, string], string][] = [
    [['id', 'asc'], 'Mặc định'],
    [['price', 'asc'], 'Giá: Giá thấp đến cao'],
    [['price', 'desc'], 'Giá: Giá cao đến thấp'],
  ];
  select: [[string, string], string] = this.selects[0];
  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    this.loadingService.show();
    this.pageRequestSubject
      .pipe(
        switchMap((pageRequest) => {
          this.loadingService.show();
          return this.productService.getAllProducts(pageRequest);
        })
      )
      .subscribe({
        next: ({ data }: any) => {
          this.products = data.contents;
          this.totalPages = data.totalPages;
          this.loadingService.hide();
        },
        error: ({ error }: any) => {
          this.alertService.error(error.message);
        },
        complete: () => {
          this.loadingService.hide();
        },
      });
  }
  getAllProducts(): void {
    this.pageRequestSubject.next(this.pageProductRequest);
  }
  toogleDropDown(): void {
    this.isOpenDropDown = !this.isOpenDropDown;
  }
  handleChangeSelect(select: [[string, string], string]): void {
    this.select = select;
    this.isOpenDropDown = false;
    this.pageProductRequest = {
      ...this.pageProductRequest,
      page: 1,
      sort_by: this.select[0][0],
      sort_dir: this.select[0][1],
    };
    this.getAllProducts();
  }
  handleChangeSearch(): void {
    this.pageProductRequest = {
      ...this.pageProductRequest,
      page: 1,
    };
    this.getAllProducts();
  }
}
{
}
