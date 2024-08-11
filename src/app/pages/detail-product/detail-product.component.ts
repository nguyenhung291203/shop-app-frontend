import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { Category, Product, ProductImage } from 'src/app/models';
import {
  ProductService,
  LoadingService,
  AlertService,
  CategoryService,
  ProductImageService,
  CartService,
} from 'src/app/services';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  productId: number = 7;
  product!: Product;
  category!: Category;
  productImages: string[] = [];
  productImage!: string;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private productImageService: ProductImageService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    this.getProductById(this.productId);
  }
  getProductById(id: number) {
    this.loadingService.show();
    this.productService.getProductById(id).subscribe({
      next: ({ data, message }) => {
        this.product = data;
        this.product.productUrl = `${environment.apiBaseUrl}products/images/${data.thumbnail}`;
        this.getCategoryById(this.product.category_id);
        this.getAllProductImagesByProductId(this.productId);
      },
      error: (error) => console.log(error),
      complete: () => this.loadingService.hide(),
    });
  }
  getCategoryById(id: number) {
    this.loadingService.show();
    this.categoryService.getCategoryById(id).subscribe({
      next: ({ data, message }) => (this.category = data),
      error: (error) => console.log(error),
      complete: () => this.loadingService.hide(),
    });
  }
  getAllProductImagesByProductId(productId: number) {
    this.loadingService.show();
    this.productImageService
      .getAllProductImagesByProductId(productId)
      .subscribe({
        next: ({ data, message }) => {
          this.productImages = [
            this.product.productUrl,
            ...data.map(
              (item: ProductImage) =>
                `${environment.apiBaseUrl}products/images/${item.imageUrl}`
            ),
          ];
          this.productImage = this.productImages[0];
        },
        error: (error) => console.log(error),
        complete: () => this.loadingService.hide(),
      });
  }
  handleChangeProductImage(productImage: string) {
    this.productImage = productImage;
  }
  addToCart() {
    console.log('Them vao gio hang');
    this.cartService.addToCart(this.productId, this.quantity);
  }
}
