import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: MessageEntity[] = [
    {
      id: this.lastId,
      content: 'This is a message test!',
      from: 'John',
      to: 'Doe',
      read: false,
      createdAt: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    return this.messages.find((message) => message.id === parseInt(id));
  }
}
