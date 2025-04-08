import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";
import { Chat } from "./chat.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName!: string

    @Column()
    lastname?: string

    @Column()
    username!: string

    @Column()
    password!: string

    @Column()
    email!: string

    @Column()
    role!: string

    @OneToMany(() => Room, (room) => room.owner)
    rooms?: Room[]

    @OneToMany(() => Chat, (chat) => chat.user)
    chats?: Chat[]
}
