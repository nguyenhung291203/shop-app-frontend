export interface UserLoginResponse {
  message: string;
  token: string;
}
export interface UserLoginRequest {
  phone_number: string;
  password: string;
}

export interface UserRegisterRequest {
  fullname: string;
  phone_number: string;
  address: string;
  password: string;
  retype_password: string;

  date_of_birth: Date;
  facebook_accout_id: number | null;
  google_account_id: number | null;
  role_id: number;
}

export interface UserResponse {
  id: number;
  fullname: string;
  phone_number: string;
  is_active: boolean;
  date_of_birth: Date;
  facebook_account_id: number | null;
  google_account_id: number | null;
  role_id: number;
  address: string;
}
