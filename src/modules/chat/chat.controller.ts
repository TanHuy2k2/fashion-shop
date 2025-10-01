import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Public } from 'src/commons/decorators/public.decorator';
import { ChatDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Public()
  @Get(':senderId/:receiverId')
  async getConversation(
    @Param('senderId') senderId: string,
    @Param('receiverId') receiverId: string,
  ): Promise<ChatDto[]> {
    return this.chatService.getMessages(senderId, receiverId);
  }
}
