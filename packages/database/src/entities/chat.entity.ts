import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { User } from "./users.entity";
import { Room } from "./room.entity";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    message !: string

    @CreateDateColumn()
    timestamp!: Date 

    @ManyToOne(() => User, (user) => user.chats)
    user !: User

    @ManyToOne(() => Room, (room) => room.chats)
    room !: Room
}