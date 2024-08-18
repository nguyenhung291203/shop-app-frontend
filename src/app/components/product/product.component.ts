import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models';
import { CartService } from 'src/app/services';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  @Input() product!: Product;
  constructor(private router: Router, private cartService: CartService) {}
  navigationToProductDetail() {
    this.router.navigate([`products/${this.product.id}`]);
  }
  addToCart() {
    this.cartService.addToCart(this.product.id);
  }
}
