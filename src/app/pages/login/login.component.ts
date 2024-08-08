import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
// import { UserLoginRespons } from 'src/app/response/user/userLogin.response';
import { AlertService } from 'src/app/services/alert.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../register/register.component.scss'],
})
export class LoginComponent {
  phone: string;
  password: string;
  isAccepted: boolean;
  isError: boolean = false;
  isErrorPhone: boolean = false;
  isErrorPassword: boolean = false;
  @ViewChild('phoneInputElement') phoneInputElement!: ElementRef;
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private alertService: AlertService
  ) {
    this.phone = '';
    this.password = '';
    this.isAccepted = false;
  }
  ngAfterViewInit(): void {
    this.phoneInputElement.nativeElement.focus();
  }
  login() {
    const loginData = {
      phone_number: this.phone,
      password: this.password,
    };
    this.isErrorPhone = this.phone.length === 0;
    this.isErrorPassword = this.password.length === 0;
    this.isError = this.isErrorPassword || this.isErrorPhone;
    if (!this.isError) {
      this.userService.login(loginData).subscribe({
        next: (res: any) => {
          const { message, token } = res;
          this.alertService.signed(message);
        },
        error: ({ error }: any) => {
          this.alertService.signFailure(error.message);
          this.isError = true;
        },
      });
      this.phone = '';
      this.password = '';
    }
  }
}
