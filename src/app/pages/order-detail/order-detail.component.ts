import { Component, OnInit } from '@angular/core';
import { CartItem, Product } from 'src/app/models';
import { CartService, ProductService } from 'src/app/services';
import { environment } from 'src/app/environments/environments';
import { RoundPipe } from 'src/app/pipe';
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: [
    './order-detail.component.scss',
    '../order/order.component.scss',
  ],
})
export class OrderDetailComponent implements OnInit {
  productIds: number[] = [];
  cart: CartItem[] = [];
  products: Product[] = [];
  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.productIds = Array.from(this.cartService.getCart().keys());
  }
  ngOnInit(): void {
    this.getAllProductsByIds();
  }
  getAllProductsByIds() {
    const cart = this.cartService.getCart();
    this.productService.getAllProductsByIds(Array.from(cart.keys())).subscribe({
      next: ({ data, mess }) => {
        this.products = data;
        this.cart = this.productIds.map((productId: number) => {
          const productFind = this.products.find(
            (productItem) => productItem.id === productId
          )!;
          return {
            quantity: cart.get(productId)!,
            product: {
              ...productFind,
              productUrl: `${environment.apiBaseUrl}products/images/${productFind.thumbnail}`,
            },
          };
        });
      },
      error: () => console.log('error'),
    });
  }
  getTotalProduct(productCart: CartItem): number {
    const total = productCart.quantity * productCart.product.price;
    return parseFloat(total.toFixed(2));
  }
  getSubTotal(): number {
    return this.cart.reduce(
      (prev: number, current: CartItem) => prev + this.getTotalProduct(current),
      0
    );
  }
  getTotal(expense: number) {
    return this.getSubTotal() - expense;
  }
}
