import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductItemEntity } from './product-item.entity';
import { DiscountEntity } from './discount.entity';

@Entity({ name: 'product_discount' })
export class ProductDisountEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => ProductItemEntity, (productItem) => productItem.productDiscount, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_item_id' })
    productItem: ProductItemEntity;

    @ManyToOne(() => DiscountEntity, (discount) => discount.productDiscount, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'discount_id' })
    discount: DiscountEntity;
}
