import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiTags } from '@nestjs/swagger';
import { EventEntity } from './entities/event.entity';

@ApiTags('EVENTS')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() eventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventService.createEvent(eventDto);
  }

  @Get('all')
  findAll() {
    return this.eventService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: number): Promise<EventEntity> {
    return this.eventService.findById(id);
  }
  

  @Put(':id')
  async update(@Param('id') id: number, @Body() eventDto: CreateEventDto): Promise<EventEntity> {
    return this.eventService.update(id, eventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.eventService.delete(id);
  }
}