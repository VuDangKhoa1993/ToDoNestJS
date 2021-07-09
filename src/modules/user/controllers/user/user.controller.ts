import { UserDto } from '@modules/user/dtos/user.dto';
import { UserCreateDto } from '@modules/user/dtos/usercreate.dto';
import { UserUpdateDto } from '@modules/user/dtos/userupdate.dto';
import { UserService } from '@modules/user/services/user/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from '@shared/custom-decorators/isPublic';

@Controller('api/users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // public async findAll(): Promise<UserDto[]> {
  //   return await this.userService.getAllUsers();
  // }

  // @Get(':id')
  // public async findOne(@Param('id') id: string): Promise<UserDto> {
  //   return await this.userService.getUserById(id);
  // }

  // @Post()
  // @Public()
  // public async create(@Body() createUserDto: UserCreateDto): Promise<UserDto> {
  //   return await this.userService.createUser(createUserDto);
  // }

  // @Put(':id')
  // public async update(
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UserUpdateDto
  // ): Promise<UserDto> {
  //   return await this.userService.updateUser(id, updateUserDto);
  // }

  // @Delete(':id')
  // public async delete(@Param('id') id: string): Promise<UserDto> {
  //   return await this.userService.delete(id);
  // }
}