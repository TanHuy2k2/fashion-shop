import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CouponUserDto {
  @IsString()
  @IsNotEmpty()
  couponId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
