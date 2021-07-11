import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerInterceptor } from '@shared/interceptors/logger.interceptor';
import { getConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { ToDoModule } from './modules/to-do/to-do.module';

@Module({
  imports: [
    ToDoModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        })
    })
  ],
  controllers: [AppController],
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
export class AppModule {}
