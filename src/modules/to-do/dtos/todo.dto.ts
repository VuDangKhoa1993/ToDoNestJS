export class ToDoDto {
    id: string;
    name: string;
    description?: string;
    status: string;
    dateOfCompletion: string;
    dateOfCreation: Date;
    dateOfModification: Date;
}