import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from '@shared/services/notification.service';
import { SharedModule } from '@shared/shared.module';
import { ToDoController } from './controllers/to-do/to-do.controller';
import { ToDoEntity } from './entities/todo.entity';
import { ToDoService } from './services/to-do/to-do.service';

@Module({
  controllers: [ToDoController],
  imports: [
    TypeOrmModule.forFeature([ToDoEntity]),
    SharedModule
  ],
  exports: [ToDoService, TypeOrmModule],
  providers: [ToDoService],
})
export class ToDoModule {}
