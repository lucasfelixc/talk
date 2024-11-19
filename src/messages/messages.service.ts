import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  private lastId = 1;
  private messages: Message[] = [
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
    return this.messageRepository.find();
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id: id },
    });

    if (message) {
      return message;
    }

    throw new NotFoundException('Message not found');
  }

  create(createMessageDto: CreateMessageDto) {
    const message = this.messageRepository.create({
      ...createMessageDto,
      read: false,
    });

    return this.messageRepository.save(message);
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

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id: id });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.messageRepository.remove(message);
  }
}
