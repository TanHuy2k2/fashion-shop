import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductItemEntity } from './product-item.entity';

@Entity({ name: 'sizes' })
export class SizeEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    size: string;

    @OneToMany(() => ProductItemEntity, (productItem) => productItem.size)
    productItem: ProductItemEntity[];
}
