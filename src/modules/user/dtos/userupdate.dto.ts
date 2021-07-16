import { PartialType } from '@nestjs/mapped-types';
import { UserCreateDto } from './usercreate.dto';
    
export class UserUpdateDto extends PartialType(UserCreateDto) { }