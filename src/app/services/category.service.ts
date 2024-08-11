import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {}
  private readonly apiCategoryUrl: string = `categories`;

  getAllCategories() {
    return this.apiService.get(this.apiCategoryUrl);
  }
  getCategoryById(id: number) {
    return this.apiService.get(`${this.apiCategoryUrl}/${id}`);
  }
}
