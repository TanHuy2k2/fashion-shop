import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class BrandDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
