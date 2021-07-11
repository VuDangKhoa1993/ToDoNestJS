import { AssignToDoDto } from '@modules/to-do/dtos/assignToDo.dto';
import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoCreateDto } from '@modules/to-do/dtos/todocreate.dto';
import { ToDoUpdateDto } from '@modules/to-do/dtos/todoupdate.dto';
import { ToDoService } from '@modules/to-do/services/to-do/to-do.service';
import { HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  Request
} from '@nestjs/common';
import { LoggerInterceptor } from '@shared/interceptors/logger.interceptor';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

@Controller('api/todos')
@UseInterceptors(LoggerInterceptor)
export class ToDoController {
  constructor(private todoService: ToDoService) {}

  @Get()
  public async findAll(): Promise<ToDoDto[]> {
    return await this.todoService.findAll();
  }

  @Get(':uuid')
  public async findOne(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string
    ): Promise<ToDoDto> {
    return await this.todoService.findOne(uuid);
  }

  @Post()
  public async create(
    @Body(new ValidationPipe()) todoCreateDto: ToDoCreateDto
    ): Promise<ToDoDto> {
    return await this.todoService.create(todoCreateDto);
  }

  @Put(':uuid')
  public async update(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string,
    @Body() todoUpdateDto: ToDoUpdateDto,
  ): Promise<ToDoDto> {
    return await this.todoService.update(uuid, todoUpdateDto);
  }

  @Delete(':uuid')
  public async delete(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string): Promise<void> {
    return await this.todoService.remove(uuid);
  }
  
  @Post('assignToDo')
  public async assignToDo(@Request() req , @Body() assignToDoDto: AssignToDoDto) : Promise<void> {
    return await this.todoService.assignToDo(assignToDoDto, req.user);
  }
}
