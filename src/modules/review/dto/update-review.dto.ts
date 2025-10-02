import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating: number;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
