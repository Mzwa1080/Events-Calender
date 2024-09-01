import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Module({
  imports : [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  create(profileData: Partial<ProfileEntity>): Promise<ProfileEntity> {
    const profile = this.profileRepository.create(profileData);
    return this.profileRepository.save(profile);
  }

  findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }

  findOne(id: number): Promise<ProfileEntity> {
    return this.profileRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const profile = await this.findOne(id);
    if (profile) {
      await this.profileRepository.remove(profile);
    }
  }
}
