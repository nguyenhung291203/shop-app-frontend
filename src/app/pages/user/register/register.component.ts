import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegisterRequest } from 'src/app/models';
import { UserService, AlertService, LoadingService } from 'src/app/services';
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
  isErrorPhone: boolean = false;
  isErrorPassword: boolean = false;
  isErrorRetypePassword: boolean = false;
  isErrorFullName: boolean = false;
  isError: boolean = false;
  @ViewChild('inputElement') inputElement!: ElementRef;
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private loadingService: LoadingService
  ) {
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.address = '';
    this.isAccepted = false;
    const currentDate = new Date();
    this.dateOfBirth = new Date(
      currentDate.getFullYear() - 18,
      currentDate.getMonth(),
      currentDate.getDate()
    );
  }
  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
  }
  register() {
    const registerData: UserRegisterRequest = {
      fullname: this.fullName,
      phone_number: this.phone,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      date_of_birth: this.dateOfBirth,
      facebook_accout_id: null,
      google_account_id: null,
      role_id: 1,
    };

    const phoneRegex = /^[0-9]{6,10}$/;
    this.isErrorPhone = !phoneRegex.test(this.phone);
    this.isErrorFullName = this.phone.length < 1;
    this.isErrorPassword =
      this.password.length < 6 || this.password !== this.retypePassword;
    this.isErrorRetypePassword =
      this.retypePassword.length < 6 || this.password !== this.retypePassword;
    this.isError =
      this.isErrorPhone ||
      this.isErrorFullName ||
      this.isErrorPassword ||
      this.isErrorRetypePassword;

    // if (!this.isError && this.isAccepted) {
    // if (this.password == this.retypePassword) {
    this.loadingService.show();
    this.userService.register(registerData).subscribe({
      next: ({ message }: any) => {
        this.alertService.signed(message);
        this.loadingService.hide();
        this.router.navigate(['login']);
      },

      error: ({ error }: any) => {
        this.loadingService.hide();
        this.alertService.signFailure(error.message);
      },
    });
    // } else {
    this.isErrorPassword = true;
    this.isErrorRetypePassword = true;
    // }
    // }
    this.phone = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.inputElement.nativeElement.focus();
  }
}
