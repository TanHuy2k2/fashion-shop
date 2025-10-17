import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CouponOrderDto {
  @IsString()
  @IsNotEmpty()
  couponId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

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
