import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserResponse,
  UserUpdateRequest,
} from '../models';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { ApiService } from './api.service';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUserUrl = `users`;
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}
  getAllUsers() {
    return this.apiService.get(this.apiUserUrl);
  }
  register(registerData: UserRegisterRequest): Observable<any> {
    return this.apiService.post(this.apiUserUrl + '/register', registerData);
  }
  login(loginData: UserLoginRequest): Observable<any> {
    return this.apiService.post(this.apiUserUrl + '/login', loginData);
  }
  updateUser(id: number, userUpdateRequest: UserUpdateRequest) {
    return this.apiService.put(`${this.apiUserUrl}/${id}`, userUpdateRequest);
  }
  getUserDetail(token: string) {
    return this.http.get(
      `${environment.apiBaseUrl}${this.apiUserUrl}/details`,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'vi',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }
  saveUserReponseToLocalStorage(userResponse: UserResponse) {
    if (userResponse) {
      const userResponseJSON = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseJSON);
    }
  }
  getUserDetailFromLocalStorage(): UserResponse | null {
    const userResponse = localStorage.getItem('user');
    return userResponse ? JSON.parse(userResponse) : null;
  }
  setUserReponse(userUpdate: any) {
    const userResponse = this.getUserDetailFromLocalStorage();
    if (userResponse) {
      if (userUpdate.fullname) {
        userResponse.fullname = userUpdate.fullname;
      }
      if (userUpdate.phone_number) {
        userResponse.phone_number = userUpdate.phone_number;
      }
      if (userUpdate.address) {
        userResponse.address = userUpdate.address;
      }
      if (userUpdate.date_of_birth) {
        userResponse.date_of_birth = userUpdate.date_of_birth;
      }
      this.saveUserReponseToLocalStorage(userResponse);
    }
  }
}
