import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PageProductRequest } from '../models';
import { ProductRequest } from '../models';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}
  private readonly apiProductUrl: string = 'products';

  getAllProducts(pageProductRequest: PageProductRequest): Observable<any> {
    return this.apiService.post(
      `${this.apiProductUrl}/search`,
      pageProductRequest
    );
  }
  getProductById(id: number) {
    return this.apiService.get(`${this.apiProductUrl}/${id}`);
  }
  getAllProductsByIds(ids: number[]) {
    return this.apiService.get(`${this.apiProductUrl}/by-ids?ids=${ids}`);
  }
  insertProduct(productRequest: ProductRequest) {
    return this.apiService.post(`${this.apiProductUrl}`, productRequest);
  }
  insertProductImage(id: number, fromData: FormData) {
    return this.apiService.post(
      `${this.apiProductUrl}/${id}/upload-images`,
      fromData,
      true
    );
  }
}
