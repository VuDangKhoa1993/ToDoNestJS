import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoCreateDto } from '@modules/to-do/dtos/todocreate.dto';
import { ToDoListDto } from '@modules/to-do/dtos/todolist.dto';
import { ToDoService } from '@modules/to-do/services/to-do/to-do.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { toPromise } from '@shared/utilities/utilities';

@Controller('api/todos')
export class ToDoController {
  constructor(private todoService: ToDoService) {}

  @Get()
  public async findAll(): Promise<ToDoListDto> {
    const todos = await this.todoService.getAllToDos();
    return toPromise({todos});
  }

  @Get(":id")
  public async findOne(@Param('id') id: string) : Promise<ToDoDto> {
    return await this.todoService.getToDoById(id);
  }

  @Post()
  public async create(@Body() todoCreateDto: ToDoCreateDto) : Promise<ToDoDto> {
    return await this.todoService.createToDo(todoCreateDto);
  }

  @Put(":id")
  public async update(@Param('id') id: string, @Body() todoDto: ToDoDto): Promise<ToDoDto>{
    return  await this.todoService.updateToDo(id, todoDto);
  } 
 
  @Delete(":id")
  public async delete(@Param("id") id: string) : Promise<ToDoDto> {
    return await this.todoService.deleteToDoDto(id);
  }
}
