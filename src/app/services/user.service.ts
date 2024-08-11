import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginRequest, UserRegisterRequest } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUserUrl = `users`;
  constructor(private apiService: ApiService) {}
  register(registerData: UserRegisterRequest): Observable<any> {
    return this.apiService.post(this.apiUserUrl + '/register', registerData);
  }
  login(loginData: UserLoginRequest): Observable<any> {
    return this.apiService.post(this.apiUserUrl + '/login', loginData);
  }
}
