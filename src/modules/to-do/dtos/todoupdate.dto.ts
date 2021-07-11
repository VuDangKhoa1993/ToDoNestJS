import { TodoStatus } from '@shared/constant/constant';
import { IsString, IsEnum, IsDateString } from 'class-validator';

export class ToDoUpdateDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsEnum(TodoStatus, {
    message: 'Status can be only whether new or completed value',
  })
  status: TodoStatus;

  @IsDateString({ strict: true })
  dateOfCompletion: string;
}
