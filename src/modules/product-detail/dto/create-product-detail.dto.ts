import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';
import { ColorDto } from 'src/modules/color/dto/color.dto';
import { ProductDto } from 'src/modules/product/dto/product.dto';

export class CreateProductDetailDto {
  @Type(() => ProductDto)
  @IsNotEmpty()
  product: ProductDto;

  @IsString()
  @IsOptional()
  image: string;

  @Type(() => ColorDto)
  @IsNotEmpty()
  color: ColorDto;

  @IsString()
  @IsNotEmpty()
  size: string;

  @Min(10000)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
