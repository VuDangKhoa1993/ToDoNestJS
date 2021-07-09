import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user/user.service';

@Module({
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [UserService],
    exports: [UserService, TypeOrmModule]
})
export class UserModule {}
