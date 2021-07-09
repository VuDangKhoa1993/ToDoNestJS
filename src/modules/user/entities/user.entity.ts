import { ToDoEntity } from "@modules/to-do/entities/todo.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: string;
    
    @Column()
    firstName: string;
    
    @Column()
    lastName: string;
    
    @Column()
    userName: string;
    
    @Column()
    password: string;
    
    @Column()
    confirmPassword: string;

    @OneToOne(() => ToDoEntity)
    @JoinColumn()
    todo: ToDoEntity;
}