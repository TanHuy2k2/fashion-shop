import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CouponEntity } from './coupon.entity';
import { UserEntity } from './user.entity';
import { AbstractEntity } from './abstract.entity';

@Entity({ name: 'coupon_users' })
export class CouponUserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CouponEntity, (coupon) => coupon.couponUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'coupon_id' })
  coupon: CouponEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'used_at' })
  usedAt: Date;
}
