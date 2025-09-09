import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { SubCategoryEntity } from './sub-category.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubCategoryEntity, (subCategory) => subCategory.category)
  subCategory: SubCategoryEntity[];
}
