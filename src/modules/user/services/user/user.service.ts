import { UserDto } from '@modules/user/dtos/user.dto';
import { UserCreateDto } from '@modules/user/dtos/usercreate.dto';
import { UserUpdateDto } from '@modules/user/dtos/userupdate.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toUserDto } from '@shared/mapper/mapper';
// import { users } from '@shared/mock.ts/mock-data';
import { toPromise } from '@shared/utilities/utilities';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: string) : Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

 // old code
  // private users: UserEntity[] = users;
  // async getAllUsers(): Promise<UserDto[]> {
  //   return await this.users.map((item) => ({
  //     userId: item.userId,
  //     firstName: item.firstName,
  //     lastName: item.lastName,
  //     userName: item.userName,
  //   }));
  // }

  // async getUserById(userId: string): Promise<UserDto> {
  //   const index = this.users.findIndex(
  //     (user: UserEntity) => user.userId === userId,
  //   );
  //   if (index < 0) {
  //     throw new HttpException('user does not exist!', HttpStatus.NOT_FOUND);
  //   }
  //   return toPromise(toUserDto(this.users[index]));
  // }

  // // async createUser(user: UserCreateDto): Promise<UserDto> {
  // //   const { firstName, lastName, userName, password, confirmPassword } = user;
  // //   const userEntity = {
  // //     userId: uuidv4(),
  // //     firstName,
  // //     lastName,
  // //     userName,
  // //     password,
  // //     confirmPassword,
  // //   };
  // //   this.users.push(userEntity);
  // //   return toPromise(toUserDto(userEntity));
  // // }

  // async updateUser(userId: string, body: UserUpdateDto): Promise<UserDto> {
  //   const index = this.users.findIndex(
  //     (user: UserEntity) => user.userId === userId,
  //   );
  //   if (index < 0) {
  //     throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   this.users[index].firstName = body.firstName;
  //   this.users[index].lastName = body.lastName;
  //   this.users[index].userName = body.userName;
  //   this.users[index].password = body.password;
  //   this.users[index].confirmPassword = body.confirmPassword;
  //   return toPromise(toUserDto(this.users[index]));
  // }

  // async delete(userId: string): Promise<UserDto> {
  //   const index = this.users.findIndex(
  //     (user: UserEntity) => user.userId === userId,
  //   );
  //   if (index < 0) {
  //     throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  //   }
  //   const deletedItem = this.users.splice(index, 1);
  //   return toPromise(toUserDto(deletedItem[0]));
  // }

  // async findUserByUsername(username: string): Promise<any> {
  //   return this.users.find((user: UserEntity) => user.userName === username);
  // }
}
