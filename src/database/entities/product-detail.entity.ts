import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductEntity } from './product.entity';
import { ColorEntity } from './color.entity';
import { ProductDisountEntity } from './product-discount.entity';
import { OrderDetailEntity } from './order-detail.entity';

@Entity({ name: 'product_detail' })
export class ProductDetailEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => ProductEntity, (product) => product.productDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  size: string;

  @ManyToOne(() => ColorEntity, (color) => color, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'color_id' })
  color: ColorEntity;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @OneToMany(
    () => ProductDisountEntity,
    (productDiscount) => productDiscount.productItem,
  )
  productDiscount: ProductDisountEntity[];

  @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.productItem)
  orderDetail: OrderDetailEntity[];
}
