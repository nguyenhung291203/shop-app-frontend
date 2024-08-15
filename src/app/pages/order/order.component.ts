import { Component, OnInit } from '@angular/core';
import { CartItem, Product, OrderRequest } from 'src/app/models';
import {
  CartService,
  ProductService,
  OrderService,
  AlertService,
  LoadingService,
  TokenService,
} from 'src/app/services';
import { environment } from 'src/app/environments/environments';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  cart: CartItem[] = [];
  productIds: number[] = [];
  products: Product[] = [];
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (!this.tokenService.getToken()) {
      this.router.navigate(['/login']);
    } else  this.getAllProductsByIds();
  }
  getAllProductsByIds() {
    const cart = this.cartService.getCart();
    this.productIds = Array.from(cart.keys());
    this.productService.getAllProductsByIds(this.productIds).subscribe({
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
  handleChangeQuantity(cartItem: CartItem, quantity: number) {
    if (cartItem.quantity + quantity !== 0) {
      this.cart = this.cart.map((item) => {
        if (item.product.id === cartItem.product.id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        return item;
      });
      this.cartService.addToCart(cartItem.product.id, quantity);
    }
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
    return this.getSubTotal() === 0 ? 0 : this.getSubTotal() - expense;
  }
  removeProductById(productId: number) {
    this.cart = this.cart.filter(
      (cartItem) => cartItem.product.id !== productId
    );
    this.cartService.removeCart(productId);
  }
  insertOrder() {
    const orderRequest: OrderRequest = {
      fullname: this.fullName,
      email: this.email,
      phone_number: this.phone,
      shipping_address: this.address,
      address: this.address,
      note: 'note',
      shipping_method: 'express',
      payload_method: 'cod',
      total_money: this.getTotal(40),
      user_id: this.tokenService.getUserId(),
      cart_items: this.cart.map((cartItem) => {
        return {
          quantity: cartItem.quantity,
          product_id: cartItem.product.id,
        };
      }),
    };
    this.loadingService.show();
    this.orderService.insertOrder(orderRequest).subscribe({
      next: ({ data, mess }: any) => {
        this.cartService.removeAllCart();
        this.cart = [];
        this.alertService.success('Tạo đơn hàng thành công');
      },
      error: ({ error }: any) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
        console.log(error);
      },
      complete: () => this.loadingService.hide(),
    });
  }
}
