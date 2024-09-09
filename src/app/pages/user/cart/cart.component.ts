import { Component } from '@angular/core';
import { CartItem, Product, OrderRequest, UserResponse } from 'src/app/models';
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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cart: CartItem[] = [];
  productIds: number[] = [];
  products: Product[] = [];
  orders!: Map<number, number>;

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
    this.getAllProductsByIds();
    this.orderService.removeAllOrder();
    this.orders = this.orderService.getOrdersFromLocalStorage();
  }
  getAllProductsByIds() {
    const cart = this.cartService.getCart();
    this.productIds = Array.from(cart.keys());
    this.loadingService.show();
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
      error: ({ error }) => {
        this.alertService.error(error.message);
        this.loadingService.hide();
      },
      complete: () => {
        this.loadingService.hide();
      },
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
      this.orderService.changeQuantityOrder(cartItem.product.id, quantity);
    }
  }
  removeProductById(productId: number) {
    this.cart = this.cart.filter(
      (cartItem) => cartItem.product.id !== productId
    );
    this.cartService.removeCart(productId);
  }
  insertProductToOrder(cartItem: CartItem) {
    this.orderService.insertOrderToLocalStorage(
      cartItem.product.id,
      cartItem.quantity
    );
  }
  isProductInOrders(productId: number): boolean {
    return this.orders.has(productId);
  }
  getTotalProduct(productCart: CartItem): number {
    const total = productCart.quantity * productCart.product.price;
    return parseFloat(total.toFixed(2));
  }
  getSubTotal(): number {
    return this.cart
      .filter((cartItem) => this.orders.has(cartItem.product.id))
      .reduce(
        (prev: number, current: CartItem) =>
          prev + this.getTotalProduct(current),
        0
      );
  }
  getTotal(expense: number) {
    return this.getSubTotal() === 0 ? 0 : this.getSubTotal() - expense;
  }
  handleNavigate(productId: number) {
    this.router.navigate([`/products/${productId}`]);
  }
  handleCreateOrder() {
    if (this.orders.size == 0)
      this.alertService.error('Bạn chưa chọn sản phẩm nào');
    else {
      this.cartService.removeCarts(Array.from(this.orders.keys()));
      this.router.navigate(['/orders']);
    }
  }
}
