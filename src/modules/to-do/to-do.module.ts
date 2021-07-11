import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoController } from './controllers/to-do/to-do.controller';
import { ToDoEntity } from './entities/todo.entity';
import { ToDoService } from './services/to-do/to-do.service';

@Module({
    controllers: [
        ToDoController
    ],
    imports: [
        TypeOrmModule.forFeature([ToDoEntity])
    ],
    exports: [ToDoService, TypeOrmModule],
    providers: [ToDoService]
})
export class ToDoModule {}
