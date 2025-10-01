import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'chat' })
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ name: 'sender_id' })
  senderId: string;

  @Column({ name: 'receiver_id' })
  receiverId: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
