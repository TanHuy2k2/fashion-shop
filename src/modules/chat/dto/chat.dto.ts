import { IsString, IsNotEmpty } from 'class-validator';

export class ChatDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
