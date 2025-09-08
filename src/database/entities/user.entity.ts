import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Role } from '../../commons/enums/role.enum';
import { OrderEntity } from './order.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ name: 'date_of_birth' })
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
