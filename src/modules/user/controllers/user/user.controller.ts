import { UserDto } from '@modules/user/dtos/user.dto';
import { UserUpdateDto } from '@modules/user/dtos/userupdate.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/services/user/user.service';
import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { LoggerInterceptor } from '@shared/interceptors/logger.interceptor';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

@Controller('api/users')
@UseInterceptors(LoggerInterceptor, CacheInterceptor, ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  public async findAll(): Promise<UserEntity[]> { 
    return await this.userService.findAll();
  }

  @Get(':uuid')
  public async findOne(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string
    ): Promise<UserEntity> {
    return await this.userService.findOne(uuid);
  }

  @Put(':uuid')
  public async update(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string,
    @Body(new ValidationPipe()) updateUserDto: UserUpdateDto
  ): Promise<UserEntity> {
    return await this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  public async delete(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string
    ): Promise<void> {
    return await this.userService.remove(uuid);
  }
}