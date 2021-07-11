import { ToDoDto } from "@modules/to-do/dtos/todo.dto";

export class UserCreateDto {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    confirmPassword: string;
    todos?: ToDoDto[];
}