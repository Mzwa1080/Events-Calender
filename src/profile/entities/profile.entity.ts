import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('USER-PROFILE')
export class ProfileEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({nullable : true})
    bio: string;
  
    @OneToOne(() => UserEntity, user => user.profile)
    user: UserEntity;

}
