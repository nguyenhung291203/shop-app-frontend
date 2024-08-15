import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserResponse } from '../models';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'access_token';
  private jwtHelperService: JwtHelperService = new JwtHelperService();
  constructor() {}
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || null;
  }
  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }
  getUserId(): number {
    let userObject = this.jwtHelperService.decodeToken(this.getToken() ?? '');
    return 'userId' in userObject ? parseInt(userObject['userId']) : 0;
  }
  getUserResponseFromLocalStorage(): UserResponse {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  removeUserResponse() {
    localStorage.removeItem('user');
    this.removeToken();
  }
}
