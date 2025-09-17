import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9])/, {
    message: 'Password must contain at least 1 letter and 1 special character',
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

  @IsNotEmpty()
  dateOfBirth: Date;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  agreeTerm: string;
}
