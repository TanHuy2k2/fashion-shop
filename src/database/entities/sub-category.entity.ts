import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { CategoryEntity } from './category.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'sub-category' })
export class SubCategoryEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => CategoryEntity, (category) => category.subCategory, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => ProductEntity, (product) => product.subCategory)
  product: ProductEntity[];
}
