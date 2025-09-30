import { Module } from '@nestjs/common';
import { MomoController } from './momo.controller';
import { MomoService } from './momo.service';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [MomoController],
  providers: [MomoService],
})
export class MomoModule {}
