import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderDetailDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  productDetailId: string;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
