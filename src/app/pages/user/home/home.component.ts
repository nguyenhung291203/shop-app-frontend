import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { DiscountPipe } from 'src/app/pipe/discount.pipe';
import { Product, Category } from 'src/app/models';
import {
  LoadingService,
  ProductService,
  CategoryService,
} from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DiscountPipe],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  page: number = 1;
  limit: number = 12;
  sortBy: string = 'id';
  sortDir: string = 'asc';
  totalPages: number = 0;
  search: string = '';
  isOpenDropDown: boolean = false;
  selects: [[string, string], string][] = [
    [['id', 'asc'], 'Mặc định'],
    [['price', 'asc'], 'Giá: Giá thấp đến cao'],
    [['price', 'desc'], 'Giá: Giá cao đến thấp'],
  ];
  select: [[string, string], string] = this.selects[0];
  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }
  getAllProducts() {
    this.loadingService.show();
    this.productService
      .getAllProducts(this.search.trim(), {
        page: this.page,
        limit: this.limit,
        sortBy: this.sortBy,
        sortDir: this.sortDir,
      })
      .subscribe({
        next: ({ data, message }: any) => {
          data.contents.forEach(
            (product: Product) =>
              (product.productUrl = `${environment.apiBaseUrl}products/images/${product.thumbnail}`)
          );
          this.products = data.contents;
          this.totalPages = data.totalPages;
        },
        error: (error: any) => console.log(error),
        complete: () => this.loadingService.hide(),
      });
  }
  getAllCategories() {
    this.loadingService.show();
    this.categoryService.getAllCategories().subscribe({
      next: ({ data, message }: any) => (this.categories = data),
      error: (error: any) => console.log(error),
      complete: () => this.loadingService.hide(),
    });
  }

  toogleDropDown() {
    this.isOpenDropDown = !this.isOpenDropDown;
  }
  handleChangeSelect(select: [[string, string], string]) {
    this.select = select;
    this.sortBy = this.select[0][0];
    this.sortDir = this.select[0][1];
    this.isOpenDropDown = false;
    this.page = 1;
    this.getAllProducts();
  }
  handleChangeSearch() {
    this.page = 1;
    this.getAllProducts();
  }
}
{
}
