import { CoreModule } from './modules/core/core.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import { AppController } from './app.controller';
import { ToDoModule } from './modules/to-do/to-do.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [
    CoreModule,
    ToDoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController]
})
export class AppModule {}
