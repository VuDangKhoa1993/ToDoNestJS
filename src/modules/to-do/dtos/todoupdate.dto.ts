import { ToDoCreateDto } from './todocreate.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ToDoUpdateDto extends PartialType(ToDoCreateDto) { }