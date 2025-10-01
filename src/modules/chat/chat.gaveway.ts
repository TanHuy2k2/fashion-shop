import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { ChatDto } from './dto/chat.dto';
import { v4 as uuidv4 } from 'uuid';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  private users = new Map<string, string>();

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() payload: ChatDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const savedMessage = await this.chatService.createMessage(payload);
    const receiverSocket = this.users.get(savedMessage.receiverId);
    if (receiverSocket) {
      this.server.to(receiverSocket).emit('recMessage', savedMessage);
    }

    client.emit('recMessage', savedMessage);
  }

  handleConnection(client: Socket) {
    let userId = client.handshake.query.userId as string;
    if (!userId || userId === 'guest') {
      userId = 'guest-' + uuidv4().slice(0, 6);
      client.emit('assign_id', userId);
    }

    this.users.set(userId, client.id);
    this.broadcastUserList();
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.users.entries()) {
      if (socketId === client.id) {
        this.users.delete(userId);
        break;
      }
    }

    this.broadcastUserList();
  }

  private broadcastUserList() {
    const userList = Array.from(this.users.keys());
    this.server.emit('user_list', userList);
  }
}
