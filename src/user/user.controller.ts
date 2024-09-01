import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('USERS')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('get-users')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':find_user_id')
  findOne(@Param('find_user_id') id: string) {
    return this.userService.findUserWithProfile(+id);
  }

  @Get(':id/events')
  async getUserWithAttendedEvents(@Param('id') id: number): Promise<UserEntity> {
    try {
      const user = await this.userService.findUserWithAttendedEvents(id);
      return user;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
