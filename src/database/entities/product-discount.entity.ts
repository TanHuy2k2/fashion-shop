import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductDetailEntity } from './product-detail.entity';
import { DiscountEntity } from './discount.entity';

@Entity({ name: 'product_discount' })
export class ProductDisountEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ProductDetailEntity,
    (productItem) => productItem.productDiscount,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'product_detail_id' })
  productItem: ProductDetailEntity;

  @ManyToOne(() => DiscountEntity, (discount) => discount.productDiscount, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'discount_id' })
  discount: DiscountEntity;
}
