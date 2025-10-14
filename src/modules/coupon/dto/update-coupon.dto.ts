import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsDate, Min } from 'class-validator';

export class UpdateCouponDto {
  @IsString()
  @IsOptional()
  code: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  couponValue: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxDiscount: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minOrderValue: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  usageLimit: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
