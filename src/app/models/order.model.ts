import { CartItem, CartItemRequest } from './cart.model';
import { Product } from './product.model';

export interface OrderRequest {
  fullname: string;
  email: string;
  phone_number: string;
  shipping_address: string;
  address?: string;
  note: string;
  shipping_method: string;
  payload_method: string;
  total_money: number;
  user_id: number;
  cart_items: CartItemRequest[];
}

export interface OrderDetailReponse {
  id: number;
  price: string;
  color: string;
  order_id: number;
  product_id: number;
  product?: Product;
  number_of_products: number;
  total_money: number;
}

export interface OrderResponse {
  id: number;
  email: string;
  address: string;
  note: string;
  orderDate: Date;
  status: string;
  totalMoney: number;
  active: boolean;
  created_date: Date;
  updated_date: Date;
  fullname: string;
  phone_number: string;
  shipping_method: string;
  shipping_address: string;
  shipping_date: Date;
  tracking_number: number;
  payment_method: number;
  user_id: number;
  order_details: OrderDetailReponse[];
}
