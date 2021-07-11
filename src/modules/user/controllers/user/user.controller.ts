import { UserDto } from '@modules/user/dtos/user.dto';
import { UserUpdateDto } from '@modules/user/dtos/userupdate.dto';
import { UserService } from '@modules/user/services/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  public async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Get(':uuid')
  public async findOne(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string
    ): Promise<UserDto> {
    return await this.userService.findOne(uuid);
  }

  @Put(':uuid')
  public async update(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string,
    @Body(new ValidationPipe()) updateUserDto: UserUpdateDto
  ): Promise<UserDto> {
    return await this.userService.update(uuid, updateUserDto);
  }

  @Delete(':uuid')
  public async delete(
    @Param('uuid', new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) uuid: string
    ): Promise<void> {
    return await this.userService.remove(uuid);
  }
}