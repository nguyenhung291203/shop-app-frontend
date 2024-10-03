import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from '../services';

@Injectable()
export class HttpCachingInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.handleRequest(req, next);
  }

  private handleRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'GET') {
      return this.handleGetRequest(req, next);
    }
    if (req.method === 'POST') {
      return this.handlePostRequest(req, next);
    }

    return next.handle(req);
  }

  private handleGetRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cachedResponse = this.cacheService.get(req);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(req, event);
        }
      })
    );
  }

  private handlePostRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/search')) {
      const cachedResponse = this.cacheService.get(req);
      if (cachedResponse) {
        return of(cachedResponse);
      }
      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            this.cacheService.put(req, event);
          }
        })
      );
    }
    return next.handle(req);
  }
}
