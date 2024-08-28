export interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  updated_date: Date;
  created_date: Date;
  category_id: number;
  description: string;
  productUrl: string;
  quantity: number;
  rating: number;
  sold: number;
}
