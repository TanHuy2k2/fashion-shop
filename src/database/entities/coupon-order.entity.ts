import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CouponEntity } from './coupon.entity';
import { OrderEntity } from './order.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'coupon_orders' })
export class CouponOrderEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CouponEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'coupon_id' })
  coupon: CouponEntity;

  @ManyToOne(() => OrderEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @CreateDateColumn({ name: 'used_at' })
  usedAt: Date;
}
