import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUserUrl = `${environment.apiBaseUrl}`;
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
        'Cache-Control': 'no-cache',
      }),
    };
  }
  constructor(private http: HttpClient) {}
  get(url: string): Observable<any> {
    return this.http.get(this.apiUserUrl + url, this.getHeaders());
  }
  post(url: string, data: any) {
    return this.http.post(this.apiUserUrl + url, data, this.getHeaders());
  }
}
