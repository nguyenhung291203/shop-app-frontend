import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem, Product, OrderRequest, UserResponse } from 'src/app/models';
import {
  ProductService,
  OrderService,
  AlertService,
  LoadingService,
  TokenService,
} from 'src/app/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  cart: CartItem[] = [];
  orders!: Map<number, number>;
  productIds: number[] = [];
  products: Product[] = [];
  fullName: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  note: string = 'Chú thích...';
  payment_methods: [string, string][] = [
    ['cash', 'Tiền mặt'],
    ['tranfer', 'Chuyển khoản'],
  ];
  payment_method: string = this.payment_methods[0][0];
  isShowMessageSuccess: boolean = false;
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private tokenService: TokenService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.orderService.removeAllOrder();
  }

  ngOnInit(): void {
    const { fullname, address, phone_number }: UserResponse =
      this.tokenService.getUserResponseFromLocalStorage();
    this.getAllProductsByIds();
    this.address = address;
    this.fullName = fullname;
    this.phone = phone_number;
  }
  getAllProductsByIds() {
    const cart = this.orderService.getOrdersFromLocalStorage();
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
            product: productFind,
          };
        });
      },
      error: () => console.log('error'),
    });
  }
  handleChangeQuantity(cartItem: CartItem, quantity: number): void {
    if (this.isShowMessageSuccess) {
      return;
    }
    if (cartItem.quantity + quantity !== 0) {
      this.cart = this.cart.map((item) => {
        if (item.product.id === cartItem.product.id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        return item;
      });
      this.orderService.changeQuantityOrder(cartItem.product.id, quantity);
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
    return this.getSubTotal() === 0 ? 0 : this.getSubTotal() + expense;
  }
  insertOrder() {
    const orderRequest: OrderRequest = {
      fullname: this.fullName,
      email: this.email,
      phone_number: this.phone,
      shipping_address: this.address,
      address: this.address,
      note: this.note,
      shipping_method: 'express',
      payment_method: this.payment_method,
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
        this.orderService.removeAllOrder();
        this.isShowMessageSuccess = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.alertService.success('Tạo đơn hàng thành công');
      },
      error: ({ error }: any) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
      complete: () => this.loadingService.hide(),
    });
  }

  handleNavigate(productId: number) {
    this.router.navigate([`/products/${productId}`]);
  }
}
