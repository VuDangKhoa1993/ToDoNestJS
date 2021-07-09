import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoCreateDto } from '@modules/to-do/dtos/todocreate.dto';
import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import { HttpStatus } from '@nestjs/common';
import { HttpException, Injectable } from '@nestjs/common';
import { toToDoDto } from '@shared/mapper/mapper';
import { todos } from '@shared/mock.ts/mock-data';
import { toPromise } from '@shared/utilities/utilities';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ToDoService {
  private todos: ToDoEntity[] = todos;
  async getAllToDos() {
    return await todos;
  }

  async getToDoById(id: string): Promise<ToDoDto> {
    const index = this.todos.findIndex((todo: ToDoEntity) => todo.id === id);
    if (index < 0) {
      throw new HttpException(
        "Todo item doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    }
    return toPromise(toToDoDto(this.todos[index]));
  }

  async createToDo(todoDto: ToDoCreateDto): Promise<ToDoDto> {
    const { name, description } = todoDto;
    const newToDoEntity: ToDoEntity = {
      id: uuidv4(),
      name,
      description,
    };
    this.todos.push(newToDoEntity);
    return toPromise(toToDoDto(newToDoEntity));
  }

  async updateToDo(id: string, todoDto: ToDoDto): Promise<ToDoDto> {
    const index = this.todos.findIndex((todo: ToDoEntity) => todo.id === id);
    if (index < 0) {
      throw new HttpException("Todo item doesn't exist", HttpStatus.NOT_FOUND);
    }
    this.todos[index].name = todoDto.name;
    this.todos[index].description = todoDto.description;
    return toPromise(toToDoDto(this.todos[index]));
  }

  async deleteToDoDto(id: string): Promise<ToDoDto> {
    const index = this.todos.findIndex((todo: ToDoEntity) => todo.id === id);
    if (index < 0) {
      throw new HttpException("Todo item doesn't exist", HttpStatus.NOT_FOUND);
    }
    const deletedTodo = this.todos.splice(index, 1);
    return toPromise(toToDoDto(deletedTodo[0]));
  }
}
