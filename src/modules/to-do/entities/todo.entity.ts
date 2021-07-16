import { UserEntity } from '@modules/user/entities/user.entity';
import { TodoStatus } from '@shared/constant/constant';
import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ToDoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', { length: 200 })
  name: string;
  @Column('varchar', { length: 200 })
  description?: string;

  @Column()
  dateOfCompletion: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.NEW,
  })
  status: TodoStatus;

  @CreateDateColumn()
  dateOfCreation: Date;

  @UpdateDateColumn()
  dateOfModification: Date;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  @Exclude()
  user: UserEntity;

  constructor(partial: Partial<ToDoEntity>) {
    Object.assign(this, partial);
  }
}
