import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }

  findOne(id: number): Promise<ProfileEntity> {
    return this.profileRepository.findOne({ where: { id } });
  }
  update(id: number, updateProfileDto: UpdateProfileDto) {
    const profileIsFound = this.profileRepository.findOne({where : {id}});
    if(profileIsFound){
      return this.profileRepository.update(id, updateProfileDto)
    }else{
      throw new NotFoundException('Profile Not Found!')
    }
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);
    if (profile) {
      await this.profileRepository.remove(profile);
    }else{
      throw new NotFoundException('Profile not found')
    }
  }
}
