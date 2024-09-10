import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models';
import {
  AlertService,
  CartService,
  LoadingService,
  OrderService,
} from 'src/app/services';

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
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}
  navigationToProductDetail() {
    this.router.navigate([`products/${this.product.id}`]);
  }
  addToCart(): void {
    if (this.product.quantity < 1) {
      this.alertService.error('Sản phẩm không đủ số lượng');
      return;
    }
    this.cartService.addToCart(this.product.id);
    this.alertService.success(
      `Thêm sản phẩm ${this.product.name} vào giỏ hàng thành công`
    );
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
