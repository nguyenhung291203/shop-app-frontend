import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterDTO } from '../dto/user/userRegister.dto';
import { UserLoginDTO } from '../dto/user/userLogin.dto';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUserUrl = `${environment.apiBaseUrl}users/`;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'vi',
  });
  constructor(private http: HttpClient, private router: Router) {}
  register(registerData: UserRegisterDTO): Observable<any> {
    return this.http.post(this.apiUserUrl + 'register', registerData, {
      headers: this.headers,
    });
  }
  login(loginData: UserLoginDTO): Observable<any> {
    return this.http.post(this.apiUserUrl + 'login', loginData, {
      headers: this.headers,
    });
  }
}
