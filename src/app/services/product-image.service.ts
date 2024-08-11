import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  private readonly apiProductImageUrl: string = `product-images`;
  constructor(private apiService: ApiService) {}
  getAllProductImagesByProductId(productId: number) {
    return this.apiService.get(
      `${this.apiProductImageUrl}/products/${productId}`
    );
  }
}
