/*
https://docs.nestjs.com/modules
*/

import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotificationService } from './services/notification.service';
import { TaskService } from './services/task.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5, // expired time for caching in seconds
      max: 10, // max number of items in cache
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    NotificationService,
    TaskService
  ],
  exports: [CacheModule]
})
export class SharedModule {}
