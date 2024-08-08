export class UserLoginDTO {
  phone_number: string;
  password: string;
  constructor(userLoginDTO: UserLoginDTO) {
    this.phone_number = userLoginDTO.phone_number;
    this.password = userLoginDTO.password;
  }
}
