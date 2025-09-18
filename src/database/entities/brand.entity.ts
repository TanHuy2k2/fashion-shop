import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'brands' })
export class BrandEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean', name: 'is_deleted', default: false })
  isDeleted: boolean;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  product: ProductEntity[];
}
