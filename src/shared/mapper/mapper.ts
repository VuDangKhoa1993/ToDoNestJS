import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import { UserDto } from '@modules/user/dtos/user.dto';
import { UserEntity } from '@modules/user/entities/user.entity';

export const toToDoDto = (data: ToDoEntity): ToDoDto => {
  const { id, name, description } = data;
  const todoDto = { id, name, description } as ToDoDto;
  return todoDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
  const { userId, userName, firstName, lastName } = data;
  const userDto = { userId, firstName, lastName, userName } as UserDto;
  return userDto;
};
