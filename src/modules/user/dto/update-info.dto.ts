import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateInfoDto {
  @IsString()
  @IsOptional()
  fullName: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  address: string;
}
