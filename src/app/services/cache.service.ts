import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, HttpResponse<any>>();

  private createCacheKey(req: HttpRequest<any>): string {
    const body = req.body ? JSON.stringify(req.body) : '';
    return `${req.method}:${req.urlWithParams}|${body}`;
  }

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const cacheKey = this.createCacheKey(req);
    return this.cache.get(cacheKey);
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const cacheKey = this.createCacheKey(req);
    this.cache.set(cacheKey, response);
  }

  clear(): void {
    this.cache.clear();
  }
}
