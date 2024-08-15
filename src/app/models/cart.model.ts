import { Product } from './product.model';

export interface CartItem {
  quantity: number;
  product: Product;
}

export interface CartItemRequest {
  quantity: number;
  product_id: number;
}
