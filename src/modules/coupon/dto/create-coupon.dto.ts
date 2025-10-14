import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDate,
  IsEnum,
  Min,
} from 'class-validator';
import { CouponType } from 'src/commons/enums/coupon-type.enum';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(CouponType)
  @IsNotEmpty()
  couponType: CouponType;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
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
  @IsNotEmpty()
  usageLimit: number;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  usedCount: number;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
