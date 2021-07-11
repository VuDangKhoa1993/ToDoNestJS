import { TodoStatus } from "@shared/constant/constant";

export class ToDoUpdateDto {
    name: string;
    description?: string;
    status: TodoStatus;
    dateOfCompletion: string;
}