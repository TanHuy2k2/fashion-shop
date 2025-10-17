import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponOrderEntity } from 'src/database/entities/coupon-order.entity';
import { Repository } from 'typeorm';
import { CouponService } from '../coupon/coupon.service';
import { CouponOrderDto } from './dto/coupon-order.dto';
import { CouponOrderInterface } from './interface/coupon-order.interface';
import { CouponUserService } from '../coupon-user/coupon-user.service';

@Injectable()
export class CouponOrderService {
  constructor(
    @InjectRepository(CouponOrderEntity)
    private couponOrderRepository: Repository<CouponOrderEntity>,
    private couponService: CouponService,
    private couponUserService: CouponUserService,
  ) {}

  async create(data: CouponOrderDto): Promise<CouponOrderInterface> {
    const { couponId, userId } = data;
    const coupon = await this.couponService.increaseUsedCount(couponId);
    const conponUser: any = await this.couponUserService.findCouponUser(
      couponId,
      userId,
    );
    if (conponUser) await this.couponUserService.updateUsedAt(conponUser.id);

    return await this.couponOrderRepository.save({
      ...data,
      coupon,
      order: { id: data.orderId },
      usedAt: new Date(),
    });
  }
}
