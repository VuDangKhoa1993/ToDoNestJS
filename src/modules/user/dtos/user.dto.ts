import { ToDoDto } from "@modules/to-do/dtos/todo.dto";

export class UserDto {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  todos: ToDoDto[]
}
