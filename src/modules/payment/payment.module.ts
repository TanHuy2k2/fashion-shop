import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentEntity } from 'src/database/entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from './payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
