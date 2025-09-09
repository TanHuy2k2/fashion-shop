import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

@Entity({ name: 'reviews' })
export class ReviewEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  comment: string;

  @Column()
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.review, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
