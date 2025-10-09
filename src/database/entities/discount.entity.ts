import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { DiscountScope } from '../../commons/enums/discount-scope.enum';
import { ProductDisountEntity } from './product-discount.entity';

@Entity({ name: 'discounts' })
export class DiscountEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  percent: number;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column({ type: 'enum', enum: DiscountScope })
  scope: DiscountScope;

  @OneToMany(
    () => ProductDisountEntity,
    (productDiscount) => productDiscount.discount,
  )
  productDiscount: ProductDisountEntity[];
}
