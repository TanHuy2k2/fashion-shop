import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { SubCategoryEntity } from './sub-category.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subCategory: SubCategoryEntity[];

  @Column({ type: 'boolean', name: 'status', default: true })
  status: boolean;
}
