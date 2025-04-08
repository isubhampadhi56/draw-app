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
    lastName?: string

    @Column({unique:true})
    username!: string

    @Column()
    password!: string

    @Column({unique:true})
    email!: string

    @Column()
    role!: string

    @OneToMany(() => Room, (room) => room.owner)
    rooms?: Room[]

    @OneToMany(() => Chat, (chat) => chat.user)
    chats?: Chat[]
}
