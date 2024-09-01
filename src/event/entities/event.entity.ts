import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('EVENT')
export class EventEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;


    @Column()
    date: Date;
  
    @ManyToOne(() => UserEntity, user => user.events, { cascade: true, onDelete: 'CASCADE' })
    organizer: UserEntity; 

    @ManyToMany(() => UserEntity, user => user.attendedEvents)
    @JoinTable({
        name: 'user_attended_events_event',
        joinColumn: { name: 'event_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' }
    })
    attendees: UserEntity[];

}
