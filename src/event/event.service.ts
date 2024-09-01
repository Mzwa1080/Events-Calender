import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { In, Repository } from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
    let organizer: UserEntity | undefined;
    let attendees: UserEntity[] = [];

    if (createEventDto.organized_by_id) {
      organizer = await this.userRepository.findOne({
        where: { id: createEventDto.organized_by_id },
      });
      if (!organizer) {
        throw new Error(`Organizer with ID ${createEventDto.organized_by_id} not found`);
      }
    }
    if (createEventDto.attendees_ids && createEventDto.attendees_ids.length > 0) {
      attendees = await this.userRepository.findBy({
        id: In(createEventDto.attendees_ids),
      });

      if (attendees.length !== createEventDto.attendees_ids.length) {
        const invalidIds = createEventDto.attendees_ids.filter(
          id => !attendees.find(attendee => attendee.id === id),
        );
        throw new Error(`Some attendee IDs are invalid: ${invalidIds.join(', ')}`);
      }
    }
    const event = this.eventRepository.create({
      title: createEventDto.title,
      date: createEventDto.date,
      organizer: organizer,
      attendees : attendees  
    });

    return this.eventRepository.save(event);
  }
  findAll() {
    return this.eventRepository.find({ relations: ['organizer'],
      select : ['id', 'title', 'date']
     })
  }
  async findById(id: number): Promise<EventEntity> {
    return this.eventRepository.findOne({
      where: { id },
      relations: ['attendees', 'organizer'],
    });
  }

  async update(id: number, eventDto: CreateEventDto): Promise<EventEntity> {
    await this.eventRepository.update(id, eventDto);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.eventRepository.delete(id);
  }
}