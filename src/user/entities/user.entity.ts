import { EventEntity } from "src/event/entities/event.entity";
import { ProfileEntity } from "src/profile/entities/profile.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('USER')
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    full_name : string;

    @Column({unique : true})
    email: string;

    @Column()
    password : string;

  
    @OneToOne(() => ProfileEntity, profile => profile.user, { cascade: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'profile_id' })
    profile: ProfileEntity;
  
    @OneToMany(() => EventEntity, event => event.organizer)
    events: EventEntity[];

    @ManyToMany(() => EventEntity, event => event.attendees)
    @JoinTable({
        name: 'user_attended_events_event',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' }
    })
    attendedEvents: EventEntity[];


}
