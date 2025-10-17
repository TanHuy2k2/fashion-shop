import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponUserEntity } from 'src/database/entities/coupon-user.entity';
import { CouponModule } from '../coupon/coupon.module';
import { CouponUserService } from './coupon-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([CouponUserEntity]), CouponModule],
  providers: [CouponUserService],
  exports: [CouponUserService],
})
export class CouponUserModule {}
