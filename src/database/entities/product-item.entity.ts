import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductEntity } from './product.entity';
import { SizeEntity } from './size.entity';
import { ColorEntity } from './color.entity';
import { ProductDisountEntity } from './product-discount.entity';
import { OrderDetailEntity } from './order-detail.entity';

@Entity({ name: 'product_item' })
export class ProductItemEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => ProductEntity, (product) => product.productItem, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @ManyToOne(() => SizeEntity, (size) => size, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'size_id' })
    size: SizeEntity;

    @ManyToOne(() => ColorEntity, (color) => color, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'color_id' })
    color: ColorEntity;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column()
    stock: number;

    @OneToMany(() => ProductDisountEntity, (productDiscount) => productDiscount.productItem)
    productDiscount: ProductDisountEntity[];

    @OneToMany(() => OrderDetailEntity, (orderDetail) => orderDetail.productItem)
    orderDetail: OrderDetailEntity[];
}
