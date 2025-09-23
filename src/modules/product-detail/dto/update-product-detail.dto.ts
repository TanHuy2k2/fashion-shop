import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateProductDetailDto {
  @Min(10000)
  @IsNumber()
  @IsOptional()
  price: number;

  @Min(0)
  @IsNumber()
  @IsOptional()
  stock: number;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
