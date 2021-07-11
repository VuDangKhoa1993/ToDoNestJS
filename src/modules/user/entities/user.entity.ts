import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("varchar", { length: 50 })
  firstName: string;

  @Column("varchar", { length: 50 })
  lastName: string;

  @Column("varchar", { length: 50 })
  userName: string;

  @Column("varchar", { length: 50 })
  password: string;

  @Column("varchar", { length: 50 })
  confirmPassword: string;

  @CreateDateColumn()
  dateOfCreation: Date;

  @UpdateDateColumn()
  dateOfModification: Date;

  @OneToMany(() => ToDoEntity, (todo) => todo.user)
  todos: ToDoEntity[];
}
