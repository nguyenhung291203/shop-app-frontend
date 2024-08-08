export class UserRegisterDTO {
  fullname: string;
  phone_number: string;
  address: string;
  password: string;
  retype_password: string;

  date_of_birth: string;
  facebook_accout_id: number | null;
  google_account_id: number | null;
  role_id: number;
  constructor(data: any) {
    this.fullname = data.fullname;
    this.phone_number = data.phone_number;
    this.address = data.address;
    this.password = data.password;
    this.retype_password = data.retype_password;
    this.date_of_birth = data.date_of_birth;
    this.facebook_accout_id = null;
    this.google_account_id = null;
    this.role_id = data.role_id;
  }
}
