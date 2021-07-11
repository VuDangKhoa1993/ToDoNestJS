import { ToDoDto } from '@modules/to-do/dtos/todo.dto';
import { ToDoEntity } from '@modules/to-do/entities/todo.entity';
import { UserDto } from '@modules/user/dtos/user.dto';
import { UserCreateDto } from '@modules/user/dtos/usercreate.dto';
import { UserUpdateDto } from '@modules/user/dtos/userupdate.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '@shared/mapper/mapper';
import { toPromise } from '@shared/utilities/utilities';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find({ relations: ['todos'] });
    return toPromise(users.map((user: UserEntity) => toUserDto(user)));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userRepository.findOne(id, {
      relations: ['todos'],
    });
    if (!user) {
      throw new HttpException('user does not exist!', HttpStatus.NOT_FOUND);
    }
    return toPromise(toUserDto(user));
  }

  async create(createUserDto: UserCreateDto): Promise<UserDto> {
    const { userName, firstName, lastName, password, confirmPassword } =
      createUserDto;
    const userEntity = new UserEntity();
    userEntity.firstName = firstName;
    userEntity.lastName = lastName;
    userEntity.userName = userName;
    userEntity.password = password;
    userEntity.confirmPassword = confirmPassword;
    await this.userRepository.save(userEntity);
    return toPromise(toUserDto(userEntity));
  }

  async update(userId: string, updateUserDto: UserUpdateDto): Promise<UserDto> {
    const { firstName, lastName, userName, password, confirmPassword } =
      updateUserDto;
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
    }
    user.firstName = firstName;
    user.lastName = lastName;
    user.userName = userName;
    user.password = password;
    user.confirmPassword = confirmPassword;
    await this.userRepository.save(user);
    return toPromise(toUserDto(user));
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new HttpException('User does not exist!', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
  }

  async findUserByUsername(username: string): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: {
        userName: username,
      },
    });
  }
}
