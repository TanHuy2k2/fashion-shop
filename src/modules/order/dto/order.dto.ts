import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from 'src/commons/enums/status.enum';

export class OrderDto {
  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  guestName?: string;

  @IsString()
  @IsOptional()
  guestPhone?: string;

  @IsNumber()
  @IsNotEmpty()
  discountAmount: number;

  @IsNumber()
  @IsNotEmpty()
  finalAmount: number;

  @IsEnum(Status)
  @IsOptional()
  status: Status;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
