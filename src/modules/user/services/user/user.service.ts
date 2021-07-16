import { UserCreateDto } from '@modules/user/dtos/usercreate.dto';
import { UserUpdateDto } from '@modules/user/dtos/userupdate.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({ relations: ['todos'] });
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id, {
      relations: ['todos'],
    });
    if (!user) {
      throw new HttpException('user does not exist!', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(createUserDto: UserCreateDto): Promise<UserEntity> {
    const { userName, firstName, lastName, password, confirmPassword } =
      createUserDto;
    const userEntity = {
      firstName,
      lastName,
      userName,
      password,
      confirmPassword,
    } as UserEntity;
    return await this.userRepository.save(userEntity);
  }

  async update(
    userId: string,
    updateUserDto: UserUpdateDto,
  ): Promise<UserEntity> {
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
    return await this.userRepository.save(user);
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
