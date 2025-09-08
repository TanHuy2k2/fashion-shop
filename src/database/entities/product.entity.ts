import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { BrandEntity } from './brand.entity';
import { SubCategoryEntity } from './sub-category.entity';
import { ProductItemEntity } from './product-item.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => BrandEntity, (brand) => brand.product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'brand_id' })
    brand: BrandEntity;

    @ManyToOne(() => SubCategoryEntity, (subCategory) => subCategory.product, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sub_category_id' })
    subCategory: SubCategoryEntity;

    @OneToMany(() => ProductItemEntity, (productItem) => productItem.product)
    productItem: ProductItemEntity[];

    @OneToMany(() => ReviewEntity, (review) => review.product)
    review: ReviewEntity[];
}
