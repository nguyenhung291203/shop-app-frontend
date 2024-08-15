import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}
  private readonly apiProductUrl: string = 'products';
  getAllProducts(
    serach: string = '',
    page: number = 1,
    limit: number = 12,
    sortBy: string = 'id',
    sortDir: string = 'asc'
  ): Observable<any> {
    return this.apiService.get(
      `${this.apiProductUrl}?search=${serach}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }
  getProductById(id: number) {
    return this.apiService.get(`${this.apiProductUrl}/${id}`);
  }
  getAllProductsByIds(ids:number[]){
    return this.apiService.get(`${this.apiProductUrl}/by-ids?ids=${ids}`);
  }
}
