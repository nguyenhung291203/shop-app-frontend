import { Injectable } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Map<number, number> = new Map();

  constructor(private productService: ProductService) {
    const stored = localStorage.getItem('cart');
    if (stored) this.cart = new Map(JSON.parse(stored));
  }
  addToCart(productId: number, quantity: number = 1) {
    if (this.cart.has(productId))
      this.cart.set(productId, this.cart.get(productId)! + quantity);
    else this.cart.set(productId, quantity);
    this.saveCartToLocalStorage();
  }
  getCart(): Map<number, number> {
    return this.cart;
  }
  removeCart(productId: number) {
    this.cart.delete(productId);
    this.saveCartToLocalStorage();
  }
  removeCarts(productIds: number[]) {
    productIds.forEach((productId) => this.cart.delete(productId));
    this.saveCartToLocalStorage();
  }
  removeAllCart() {
    this.cart.clear();
    this.saveCartToLocalStorage();
  }
  private saveCartToLocalStorage(): void {
    localStorage.setItem(
      'cart',
      JSON.stringify(Array.from(this.cart.entries()))
    );
  }
}
