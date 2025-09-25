import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CartDto {
  @IsString()
  @IsNotEmpty()
  productDetailId: string;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
