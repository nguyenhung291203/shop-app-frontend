import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category, Product, ProductRequest } from 'src/app/models';
import {
  AlertService,
  CategoryService,
  LoadingService,
  ProductService,
} from 'src/app/services';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  @Input() product!: Product;
  @Input() visibleEditProduct: boolean = false;
  @Output() visibleEditProductChange = new EventEmitter<boolean>();
  categories: Category[] = [];
  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.loadingService.show();
    this.categoryService.getAllCategories().subscribe({
      next: ({ data }) => {
        this.categories = data;
        this.loadingService.hide();
      },
      error: ({ error }) => {
        this.loadingService.hide();
        this.alertService.error(error.message);
      },
    });
  }
  editProduct() {
    this.loadingService.show();

    if (this.product.quantity < 0) {
      this.alertService.error('Số lượng không phù hợp');
      return;
    }
    if (!this.product.name.length) {
      this.alertService.error('Tên sản phẩm không phù hợp');
      return;
    }
    if (this.product.price <= 0) {
      this.alertService.error('Giá sản phẩm không phù hợp');
      return;
    }
    const productRequest: ProductRequest = {
      name: this.product.name,
      price: this.product.price,
      category_id: this.product.category.id,
      quantity: this.product.quantity,
    };
    this.productService
      .updateProduct(this.product.id, productRequest)
      .subscribe({
        next: ({ data, message }: any) => {
          this.product = data;
          this.loadingService.hide();
          this.visibleEditProduct = false;
          this.alertService.success(message);
        },
        error: ({ error }) => {
          this.loadingService.hide();
          this.alertService.error(error.message);
        },
      });
  }
  handleSubmit(): void {
    this.editProduct();
  }
  closeDialogEditProduct(): void {
    this.visibleEditProductChange.emit(false);
  }
}
