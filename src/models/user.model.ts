import {IsEmail, MinLength, IsString, MaxLength, IsOptional} from 'class-validator'
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

export interface AuthPayload {
  username: string
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  image: string;

  @IsOptional()
  bio: string;
}

export interface AuthPayload {
  username: string;
}