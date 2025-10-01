import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatDto } from './dto/chat.dto';
import { ChatEntity } from 'src/database/entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
  ) {}

  async createMessage(chat: ChatDto): Promise<ChatDto> {
    return await this.chatRepository.save(chat);
  }

  async getMessages(senderId: string, receiverId: string): Promise<ChatDto[]> {
    return await this.chatRepository.find({
      where: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
      order: { createdAt: 'ASC' },
    });
  }
}
