import {IsEmail, MinLength, IsString, MaxLength} from 'class-validator'
export class LoginDTO {

  @IsEmail()
  @MinLength(4)
  @IsString()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}

export class RegisterDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
}