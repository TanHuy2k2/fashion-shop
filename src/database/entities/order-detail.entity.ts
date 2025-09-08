import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { OrderEntity } from './order.entity';
import { ProductItemEntity } from './product-item.entity';

@Entity({ name: 'order_detial' })
export class OrderDetailEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => OrderEntity, (order) => order.orderDetail, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: OrderEntity;

    @ManyToOne(() => ProductItemEntity, (productItem) => productItem.orderDetail, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_item_id' })
    productItem: ProductItemEntity;

    @Column({ name: 'unit_price' })
    unitPrice: number;

    @Column({ name: 'quantity' })
    quantity: number;

    @Column({ name: 'total_price' })
    totalPrice: number;
}
