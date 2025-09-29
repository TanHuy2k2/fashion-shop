import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentMethod } from 'src/commons/enums/payment-method.enum';
import { Status } from 'src/commons/enums/status.enum';

export class PaymentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod;

  @IsDate()
  @IsOptional()
  paymentDate: Date;

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
