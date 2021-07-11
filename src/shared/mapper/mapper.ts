import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import { UserDto } from '@modules/user/dtos/user.dto';
import { UserEntity } from '@modules/user/entities/user.entity';

export const toToDoDto = (data: ToDoEntity): ToDoDto => {
  const { id, name, description, dateOfCompletion, status, dateOfCreation, dateOfModification } = data;
  const todoDto = { id, name, description, status, dateOfCompletion, dateOfCreation, dateOfModification } as ToDoDto;
  return todoDto;
};

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, userName, firstName, lastName, todos } = data;
  const userDto = { id, firstName, lastName, userName, todos } as UserDto;
  return userDto;
};
