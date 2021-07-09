import { Module } from '@nestjs/common';
import { ToDoController } from './controllers/to-do/to-do.controller';
import { ToDoService } from './services/to-do/to-do.service';

@Module({
    controllers: [ToDoController],
    providers: [ToDoService]
})
export class ToDoModule {}
