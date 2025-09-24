import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';
import { ColorDto } from 'src/modules/color/dto/color.dto';

export class UpdateProductDetailDto {
  @IsString()
  @IsOptional()
  image: string;

  @Type(() => ColorDto)
  @IsOptional()
  color: ColorDto;

  @IsString()
  @IsOptional()
  size: string;

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
