import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Role } from '../../commons/enums/role.enum';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;s

  @Column()
  image: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'date_of_birth', type: 'date' })
  dateOfBirth: Date;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  role: Role;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  review: ReviewEntity[];
}
