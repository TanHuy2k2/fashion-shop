import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Status } from '../../commons/enums/status.enum';
import { OrderEntity } from './order.entity';

@Entity({ name: 'shipping' })
export class ShippingEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.shipping, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ name: 'shipping_address' })
  shippingAdress: string;

  @Column({ name: 'shipping_method' })
  shippingMethod: string;

  @Column({ name: 'shipping_fee' })
  shippingFee: number;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
