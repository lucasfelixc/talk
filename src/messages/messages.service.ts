import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleService } from 'src/people/people.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly peopleService: PeopleService,
  ) {}

  findAll() {
    const messages = this.messageRepository.find({
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: { id: id },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (message) {
      return message;
    }

    throw new NotFoundException('Message not found');
  }

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;

    const from = await this.peopleService.findOne(fromId);

    const to = await this.peopleService.findOne(toId);

    const newMessage = {
      content: createMessageDto.content,
      from,
      to,
      read: false,
      data: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    this.messageRepository.save(message);

    return {
      ...message,
      from: {
        id: from.id,
        name: from.name,
      },
      to: {
        id: to.id,
        name: to.name,
      },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessageDto = {
      content: updateMessageDto.content,
    };

    const message = await this.messageRepository.preload({
      id: id,
      ...partialUpdateMessageDto,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.messageRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id: id });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.messageRepository.remove(message);
  }
}
