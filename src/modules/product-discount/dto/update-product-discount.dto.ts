import { IsString, IsOptional } from 'class-validator';

export class UpdateProductDiscountDto {
  @IsString()
  @IsOptional()
  productId: string;

  @IsString()
  @IsOptional()
  discountId: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
