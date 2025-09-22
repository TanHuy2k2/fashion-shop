import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductItemEntity } from './product-item.entity';

@Entity({ name: 'colors' })
export class ColorEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'hex_code' })
  hexCode: string;

  @OneToMany(() => ProductItemEntity, (productItem) => productItem.color)
  productItem: ProductItemEntity[];
}
