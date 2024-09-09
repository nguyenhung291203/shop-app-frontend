import { Component, Input } from '@angular/core';
import {  Router } from '@angular/router';
import { Product } from 'src/app/models';
import { CartService, LoadingService, OrderService } from 'src/app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;
  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
    private loadingService: LoadingService
  ) {}
  navigationToProductDetail() {
    this.router.navigate([`products/${this.product.id}`]);
  }
  addToCart() {
    this.cartService.addToCart(this.product.id);
  }
  navigateToOrderPage() {
    this.loadingService.show();
    setTimeout(() => {
      this.orderService.removeAllOrder();
      this.orderService.insertOrderToLocalStorage(this.product.id);
      this.router.navigate(['orders']);
      this.loadingService.hide();
    }, 300);
  }
}
