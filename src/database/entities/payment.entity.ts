import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderEntity } from './order.entity';
import { Status } from '../../commons/enums/status.enum';
import { PaymentMethod } from '../../commons/enums/payment-method.enum';

@Entity({ name: 'payments' })
export class PaymentEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => OrderEntity, (order) => order.payment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column({ name: 'payment_method', type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_date' })
  paymentDate: Date;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
