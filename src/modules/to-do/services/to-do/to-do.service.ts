import { AssignToDoDto } from '@modules/to-do/dtos/assignToDo.dto';
import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoCreateDto } from '@modules/to-do/dtos/todocreate.dto';
import { ToDoUpdateDto } from '@modules/to-do/dtos/todoupdate.dto';
import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoStatus } from '@shared/constant/constant';
import { toToDoDto } from '@shared/mapper/mapper';
import { toPromise } from '@shared/utilities/utilities';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private todoRepository: Repository<ToDoEntity>,
    private connection: Connection,
  ) {}

  async findAll(): Promise<ToDoDto[]> {
    const todoEntities = await this.todoRepository.find({
      relations: ['user'],
    });
    return toPromise(
      todoEntities.map((toDoEntity: ToDoEntity) => toToDoDto(toDoEntity)),
    );
  }

  async findOne(id: string): Promise<ToDoDto> {
    const todo = await this.todoRepository.findOne(id, { relations: ['user'] });
    if (!todo) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }
    return toPromise(toToDoDto(todo));
  }

  async create(createTodoDto: ToDoCreateDto): Promise<ToDoDto> {
    const { name, description, status, dateOfCompletion } = createTodoDto;
    // const userRepository = await this.connection.getRepository(UserEntity);
    // const user = await userRepository.findOne(userId);
    const todoEntity = new ToDoEntity();
    todoEntity.name = name;
    todoEntity.description = description;
    // todoEntity.user = user;
    todoEntity.status = status;
    todoEntity.dateOfCompletion = dateOfCompletion;
    await this.todoRepository.save(todoEntity);
    return toPromise(toToDoDto(todoEntity));
  }

  async update(id: string, updateToDoDto: ToDoUpdateDto): Promise<ToDoDto> {
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
    // const userRepository = await this.connection.getRepository(UserEntity);
    // const user = await userRepository.findOne(userId);

    todoEntity.name = name;
    todoEntity.description = description;
    todoEntity.status = status;
    todoEntity.dateOfCompletion = dateOfCompletion;
    // todoEntity.user = user;
    this.todoRepository.save(todoEntity);
    return toPromise(toToDoDto(todoEntity));
  }

  async remove(id: string): Promise<void> {
    const todoEntity = await this.todoRepository.findOne(id);
    if (!todoEntity) {
      throw new HttpException('Todo does not exist', HttpStatus.NOT_FOUND);
    }
    if(todoEntity.status === TodoStatus.COMPLETED) {
      throw new BadRequestException(
        'Could not delete a todo with completed status',
      );
    }
    await this.todoRepository.remove(todoEntity);
  }

  async assignToDo(assignToDoDto: AssignToDoDto, currentUser: UserEntity) : Promise<void> {
    if(currentUser.id === assignToDoDto.userId) {
      throw new BadRequestException('Could not assign this todo to yourself!');
    }
    const { userId, todoId } = assignToDoDto;
    const todoEntity = await this.todoRepository.findOne(todoId);
    const userRepository = await this.connection.getRepository(UserEntity);
    const userEntity = await userRepository.findOne(userId);
    if(!todoEntity || !userEntity) {
      throw new BadRequestException();
    }
    todoEntity.user = userEntity;
    this.todoRepository.save(todoEntity);
  }
}
