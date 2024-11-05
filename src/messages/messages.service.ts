import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

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
    const message = this.messages.find(
      (message) => message.id === parseInt(id),
    );

    if (message) {
      return message;
    }

    throw new NotFoundException('Message not found');
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;
    this.messages.push({
      id: this.lastId,
      ...createMessageDto,
      read: false,
      createdAt: new Date(),
    });

    return this.messages[this.messages.length - 1];
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    const messageIndex = this.messages.findIndex(
      (message) => message.id === parseInt(id),
    );

    if (messageIndex < 0) {
      throw new NotFoundException('Message not found');
    }

    const message = this.messages[messageIndex];

    this.messages[messageIndex] = {
      ...message,
      ...updateMessageDto,
    };

    return this.messages[messageIndex];
  }

  remove(id: string) {
    const removedMessageIndex = this.messages.findIndex(
      (message) => message.id === parseInt(id),
    );

    if (removedMessageIndex < 0) {
      throw new NotFoundException('Message not found');
    }

    this.messages.splice(removedMessageIndex, 1);
  }
}
