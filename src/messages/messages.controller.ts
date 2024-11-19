import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    const messages = await this.messagesService.findAll();

    return messages;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);

    return message;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Patch(':id/message')
  updateMessage(@Param('id') id: string, @Body() body: any) {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
