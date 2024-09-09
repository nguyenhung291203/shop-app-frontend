import { Category } from "./category.model";

export interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  updated_date: Date;
  created_date: Date;
  category: Category;
  description: string;
  productUrl: string;
  quantity: number;
  rating: number;
  sold: number;
  images:string[]
}

export interface ProductRequest {
  name: string;
  price: number;
  thumbnail?: string;
  category_id: number;
  description?: string;
  quantity: number;
  rating?: number;
  sold?: number;
}
