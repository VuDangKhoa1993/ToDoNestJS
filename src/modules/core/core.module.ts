import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerInterceptor } from '@shared/interceptors/logger.interceptor';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        })
    }),
    ScheduleModule.forRoot()
  ],
  providers: [
    {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: LoggerInterceptor
      }
  ],
})
export class CoreModule {}
