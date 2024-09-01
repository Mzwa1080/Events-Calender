import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ProfileModule } from './profile/profile.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions), ProfileModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
