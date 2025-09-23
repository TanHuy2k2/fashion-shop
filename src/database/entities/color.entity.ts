import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductDetailEntity } from './product-detail.entity';

@Entity({ name: 'colors' })
export class ColorEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'hex_code' })
  hexCode: string;

  @OneToMany(() => ProductDetailEntity, (productDetail) => productDetail.color)
  productItem: ProductDetailEntity[];
}
