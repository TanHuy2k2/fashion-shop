import { IsString, IsNotEmpty, Matches, MinLength, IsEmail } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])/, {
    message: 'password must contain at least 1 letter and 1 special character',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])/, {
    message: 'password must contain at least 1 letter and 1 special character',
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  rePassword: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
