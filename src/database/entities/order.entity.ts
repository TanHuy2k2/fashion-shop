import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { Status } from '../../commons/enums/status.enum';
import { ShippingEntity } from './shipping.entity';
import { PaymentEntity } from './payment.entity';
import { OrderDetailEntity } from './order-detail.entity';

@Entity({ name: 'orders' })
export class OrderEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.order, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'discount_amount' })
  discountAmount: number;

  @Column({ name: 'final_amount' })
  finalAmount: number;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @OneToMany(() => ShippingEntity, (shipping) => shipping.order)
  shipping: ShippingEntity[];

  @OneToOne(() => ShippingEntity, (shipping) => shipping.order)
  payment: PaymentEntity;

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetailEntity[];
}
