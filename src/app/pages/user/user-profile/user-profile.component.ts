import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/models';
import {
  AlertService,
  LoadingService,
  TokenService,
  UserService,
} from 'src/app/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user!: UserResponse;
  fullName!: string;
  email!: string;
  phone!: string;
  address!: string;
  password!: string;
  retypePassword!: string;
  dateOfBirth!: Date;
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private alertService: AlertService,
    private loadingSerivce: LoadingService
  ) {}
  ngOnInit(): void {
    this.resetUserInfo();
  }
  updateUser() {
    const userUpdateRequest = {
      fullname: this.fullName,
      phone_number: this.phone,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      date_of_birth: this.dateOfBirth,
    };
    this.loadingSerivce.show();
    this.userService
      .updateUser(this.tokenService.getUserId(), userUpdateRequest)
      .subscribe({
        next: ({ data, message }: any) => {
          this.user = data;
          this.userService.saveUserReponseToLocalStorage(this.user);
          this.resetUserInfo();
          this.alertService.success(message);
        },
        error: ({ error }: any) => {
          this.alertService.error(error.message);
          this.loadingSerivce.hide();
        },
        complete: () => this.loadingSerivce.hide(),
      });
  }

  resetUserInfo() {
    this.user = this.tokenService.getUserResponseFromLocalStorage();
    this.fullName = this.user.fullname;
    this.address = this.user.address;
    this.phone = this.user.phone_number;
    this.password = '';
    this.dateOfBirth = this.user.date_of_birth;
  }
}
