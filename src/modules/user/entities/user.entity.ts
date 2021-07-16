import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 50 })
  lastName: string;

  @Column('varchar', { length: 50 })
  userName: string;

  @Column('varchar', { length: 50 })
  @Exclude()
  password: string;

  @Column('varchar', { length: 50 })
  @Exclude()
  confirmPassword: string;

  @CreateDateColumn()
  dateOfCreation: Date;

  @UpdateDateColumn()
  dateOfModification: Date;

  @OneToMany(() => ToDoEntity, (todo) => todo.user)
  @Transform(({ value }) => value.map((el) => ({ name: el.name })))
  todos: ToDoEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
