import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderEntity } from './order.entity';
import { ProductDetailEntity } from './product-detail.entity';

@Entity({ name: 'order_detail' })
export class OrderDetailEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @ManyToOne(
    () => ProductDetailEntity,
    (productDetail) => productDetail.orderDetail,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'product_detail_id' })
  productDetail: ProductDetailEntity;

  @Column({ name: 'unit_price' })
  unitPrice: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'total_price' })
  totalPrice: number;
}
