import { AssignToDoDto } from '@modules/to-do/dtos/assignToDo.dto';
import { ToDoCreateDto } from '@modules/to-do/dtos/todocreate.dto';
import { ToDoUpdateDto } from '@modules/to-do/dtos/todoupdate.dto';
import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import {
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoStatus } from '@shared/constant/constant';
import { CronJob } from 'cron';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private todoRepository: Repository<ToDoEntity>,
    private connection: Connection,
    private schedulerRegistry: SchedulerRegistry
  ) {}

  async findAll(): Promise<ToDoEntity[]> {
    const job = this.schedulerRegistry.getCronJob('notifications') as CronJob;
    job.stop();
    console.log('this is a cronjob');
    console.log(job.lastDate());

    return await this.todoRepository.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<ToDoEntity> {
    const todo = await this.todoRepository.findOne(id, { relations: ['user'] });
    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }
    return todo;
  }

  async create(createTodoDto: ToDoCreateDto): Promise<ToDoEntity> {
    const { name, description, status, dateOfCompletion } = createTodoDto;
    const todoEntity = {
      name,
      description,
      status,
      dateOfCompletion
    } as ToDoEntity;
    return await this.todoRepository.save(todoEntity);
  }

  async update(id: string, updateToDoDto: ToDoUpdateDto): Promise<ToDoEntity> {
    const { name, description, status, dateOfCompletion } = updateToDoDto;
    const todoEntity = await this.todoRepository.findOne(id);
    if (!todoEntity) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }

    if (todoEntity.status === TodoStatus.COMPLETED) {
      throw new BadRequestException(
        'Could not update a todo with completed status',
      );
    }
    todoEntity.name = name;
    todoEntity.description = description;
    todoEntity.status = status;
    todoEntity.dateOfCompletion = dateOfCompletion;
    return await this.todoRepository.save(todoEntity);
  }

  async remove(id: string): Promise<void> {
    const todoEntity = await this.todoRepository.findOne(id);
    if (!todoEntity) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }
    if (todoEntity.status === TodoStatus.COMPLETED) {
      throw new BadRequestException(
        'Could not delete a todo with completed status',
      );
    }
    await this.todoRepository.remove(todoEntity);
  }

  async assignToDo(
    assignToDoDto: AssignToDoDto,
    currentUser: UserEntity,
  ): Promise<void> {
    if (currentUser.id === assignToDoDto.userId) {
      throw new BadRequestException('Could not assign this todo to yourself!');
    }
    const { userId, todoId } = assignToDoDto;
    const todoEntity = await this.todoRepository.findOne(todoId);
    const userRepository = await this.connection.getRepository(UserEntity);
    const userEntity = await userRepository.findOne(userId);
    if (!todoEntity || !userEntity) {
      throw new BadRequestException();
    }
    todoEntity.user = userEntity;
    this.todoRepository.save(todoEntity);
  }
}
