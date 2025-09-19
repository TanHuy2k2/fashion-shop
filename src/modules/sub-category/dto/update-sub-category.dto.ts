import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
