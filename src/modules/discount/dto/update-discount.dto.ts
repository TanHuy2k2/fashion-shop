import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { DiscountScope } from 'src/commons/enums/discount-scope.enum';

export class UpdateDiscountDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  percent: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  startDate: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsEnum(DiscountScope)
  @IsOptional()
  scope: DiscountScope;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
