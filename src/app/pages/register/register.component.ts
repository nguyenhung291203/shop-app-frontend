import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  phone: string;
  password: string;
  retypePassword: string;
  fullName: string;
  address: string;
  isAccepted: boolean;
  dateOfBirth: Date;
  constructor(private http: HttpClient) {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear() - 18);
  }
  onPhoneChange() {
    console.log(`Phone: ${this.phone}`);
  }
  register() {
    const message = `phone: ${this.phone}
                      password: ${this.password}
                      retypePassword: ${this.retypePassword}
                      address: ${this.address}
                      fullName: ${this.fullName}
                      dateOfBirth: ${this.dateOfBirth}
                      isAccepted: ${this.isAccepted}`;
    const registerData = {
      fullname: this.fullName,
      phone_number: this.phone,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      date_of_birth: this.dateOfBirth,
      facebook_accout_id: 0,
      google_account_id: 0,
      role_id: 1,
    };
    const apiUrl = 'http://localhost:8080/api/v1/users/register';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post(apiUrl, registerData, { headers }).subscribe({});
    console.log(message);
  }
}
