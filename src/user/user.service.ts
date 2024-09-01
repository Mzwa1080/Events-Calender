import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/profile/entities/profile.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepository : Repository<UserEntity>,
              @InjectRepository(ProfileEntity) private profileRepository : Repository<ProfileEntity>
){}

  async create(createUserDto: CreateUserDto) {
    const profile = this.profileRepository.create({
      bio: createUserDto.bio,  
    });
    const user = this.userRepository.create({...createUserDto,profile});
    return await this.userRepository.save(user);
    
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find({ relations: ['profile'] });
  }

  findUserWithProfile(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id }, relations: ['profile'] });
  }
  async findUserWithAttendedEvents(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['attendedEvents'], // Include the attended events
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return user;
  }
  async findUserWithEvents(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: id }, relations: ['events'] });
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

   async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({where : {id}, relations: ['profile'] });

    if (user) {
      await this.userRepository.remove(user);
      console.log('User removed successfully');
    } else {
      console.log('User not found');
    }
  }
}
