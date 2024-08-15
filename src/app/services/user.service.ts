import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginRequest, UserRegisterRequest, UserResponse } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUserUrl = `users`;
  constructor(private apiService: ApiService, private http: HttpClient) {}
  register(registerData: UserRegisterRequest): Observable<any> {
    return this.apiService.post(this.apiUserUrl + '/register', registerData);
  }
  login(loginData: UserLoginRequest): Observable<any> {
    return this.apiService.post(this.apiUserUrl + '/login', loginData);
  }
  getUserDetail(token: string) {
    return this.http.get(`${environment.apiBaseUrl}${this.apiUserUrl}/details`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'vi',
        Authorization: `Bearer ${token}`,
      }),
    });
  }
  saveUserReponseToLocalStorage(userResponse: UserResponse) {
    if (userResponse) {
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
    }
  }
}
