import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponEntity } from 'src/database/entities/coupon.entity';
import { LessThanOrEqual, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { CouponInterface } from './interface/coupon.interface';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponMapper } from './mapper/coupon.mapper';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(CouponEntity)
    private couponRepository: Repository<CouponEntity>,
  ) {}

  async findAll(
    dateString: string,
    userId: string,
  ): Promise<CouponInterface[]> {
    const date = new Date(dateString);
    if (!date) {
      throw new Error('Invalid date format');
    }

    const condition: any = {
      usedCount: Raw(() => `used_count < usage_limit`),
      startDate: LessThanOrEqual(date),
      endDate: MoreThanOrEqual(date),
    };

    const coupons = await this.couponRepository.find({
      where: [
        {
          ...condition,
          isGlobal: true,
        },
        {
          ...condition,
          isGlobal: false,
          couponUsers: { user: { id: userId } },
        },
      ],
      relations: ['couponUsers'],
    });

    return coupons.map((coupon) => CouponMapper.toResponse(coupon));
  }

  async findByCode(codeName: string): Promise<CouponInterface | null> {
    return await this.couponRepository.findOneBy({ code: codeName });
  }

  async findById(id: string): Promise<CouponInterface | null> {
    return await this.couponRepository.findOneBy({ id });
  }

  async create(data: CreateCouponDto): Promise<CouponInterface> {
    try {
      const couponByCode = await this.findByCode(data.code);
      if (couponByCode) {
        throw new ConflictException(`This coupon already exists!`);
      }

      return await this.couponRepository.save(data);
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: UpdateCouponDto): Promise<CouponInterface> {
    try {
      const couponById = await this.findById(id);
      if (!couponById) {
        throw new NotFoundException(`No have coupon with id = ${id}`);
      }

      const couponByCode = await this.findByCode(data.code);
      if (couponByCode && id !== couponByCode.id) {
        throw new ConflictException(`This coupon already exists!`);
      }

      return await this.couponRepository.save({
        id,
        ...data,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string, userId: string): Promise<CouponInterface> {
    try {
      const couponById = await this.findById(id);
      if (!couponById) {
        throw new NotFoundException(`No have coupon with id = ${id}`);
      }

      return await this.couponRepository.save({
        id,
        deletedAt: new Date(),
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
