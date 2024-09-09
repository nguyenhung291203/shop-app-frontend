import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { Category, Product, ProductImage } from 'src/app/models';
import {
  ProductService,
  LoadingService,
  AlertService,
  CategoryService,
  ProductImageService,
  CartService,
  OrderService,
  TokenService,
} from 'src/app/services';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss'],
})
export class DetailProductComponent implements OnInit {
  productId!: number;
  product!: Product;
  category!: Category;
  productImages: string[] = [];
  productImage!: string;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private cartService: CartService,
    private router: ActivatedRoute,
    private route: Router,
    private orderService: OrderService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.getProductId();
    this.getProductById(this.productId);
  }
  getProductId() {
    const id = Number(this.router.snapshot.paramMap.get('id'));
    this.productId = id;
  }
  getProductById(id: number) {
    this.loadingService.show();
    this.productService.getProductById(id).subscribe({
      next: ({ data }) => {
        this.product = data;
        this.productImages = [data.thumbnail, ...data.images];
        this.productImage = this.productImages[0];
      },
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
      complete: () => this.loadingService.hide(),
    });
  }

  handleChangeProductImage(productImage: string) {
    this.productImage = productImage;
  }
  addToCart(): void {
    if (this.tokenService.getToken()) {
      this.cartService.addToCart(this.productId, this.quantity);
    } else {
      this.route.navigate(['login']);
    }
  }
  navigateToOrderPage(): void {
    if (this.quantity > this.product.quantity) {
      return;
    }
    this.loadingService.show();
    setTimeout(() => {
      this.orderService.removeAllOrder();
      this.orderService.insertOrderToLocalStorage(
        this.productId,
        this.quantity
      );
      this.route.navigate(['orders']);
      this.loadingService.hide();
    }, 300);
  }
}
