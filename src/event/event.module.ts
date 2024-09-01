import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { EventEntity } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([EventEntity, UserEntity])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
