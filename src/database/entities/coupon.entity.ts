import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CouponType } from '../../commons/enums/coupon-type.enum';
import { CouponUserEntity } from './coupon-user.entity';

@Entity({ name: 'coupons' })
export class CouponEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    name: 'coupon_type',
    type: 'enum',
    enum: CouponType,
  })
  couponType: CouponType;

  @Column({
    name: 'coupon_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  couponValue: number;

  @Column({
    name: 'max_discount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  maxDiscount: number | null;

  @Column({
    name: 'min_order_value',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  minOrderValue: number | null;

  @Column({ name: 'usage_limit', type: 'int', default: 0 })
  usageLimit: number;

  @Column({ name: 'used_count', type: 'int', default: 0 })
  usedCount: number;

  @Column({ name: 'is_global', type: 'boolean', default: true })
  isGlobal: boolean;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @OneToMany(() => CouponUserEntity, (couponUser) => couponUser.coupon)
  couponUsers: CouponUserEntity[];
}
