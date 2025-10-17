import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CouponService } from '../coupon/coupon.service';
import { CouponUserEntity } from 'src/database/entities/coupon-user.entity';
import { CouponUserDto } from './dto/coupon-user.dto';

@Injectable()
export class CouponUserService {
  constructor(
    @InjectRepository(CouponUserEntity)
    private couponUserRepository: Repository<CouponUserEntity>,
    private couponService: CouponService,
  ) {}

  async findCouponUser(
    couponId: string,
    userId: string,
  ): Promise<CouponUserEntity | null> {
    return await this.couponUserRepository.findOne({
      where: { coupon: { id: couponId }, user: { id: userId } },
    });
  }

  async create(data: CouponUserDto): Promise<CouponUserEntity> {
    const coupon = await this.couponService.increaseUsedCount(data.couponId);

    return await this.couponUserRepository.save({
      ...data,
      coupon,
      user: { id: data.userId },
    });
  }

  async updateUsedAt(id: string): Promise<CouponUserEntity> {
    return await this.couponUserRepository.save({
      id,
      usedAt: new Date(),
    });
  }
}
