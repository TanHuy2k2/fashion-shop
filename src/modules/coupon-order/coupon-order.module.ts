import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponOrderEntity } from 'src/database/entities/coupon-order.entity';
import { CouponOrderController } from './coupon-order.controller';
import { CouponOrderService } from './coupon-order.service';
import { CouponModule } from '../coupon/coupon.module';
import { CouponUserModule } from '../coupon-user/coupon-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponOrderEntity]),
    CouponModule,
    CouponUserModule,
  ],
  controllers: [CouponOrderController],
  providers: [CouponOrderService],
})
export class CouponOrderModule {}
