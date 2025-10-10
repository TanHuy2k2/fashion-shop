import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDiscountDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  discountId: string;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
