import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
import { Chat } from "./chat.entity";
@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name!: string;

    @Column({nullable: true})
    description?: string;

    @Column({default: false})
    isPrivate?: boolean;

    @Column({nullable: true})
    maxUsers?: number;

    @Column({nullable:true})
    password?: string;

    @CreateDateColumn()
    createdAt!: Date 

    @ManyToOne(() => User, (user) => user.rooms)
    owner?: User;

    @OneToMany(()=>Chat, (chat) => chat.room)
    chats?: Chat[]
}