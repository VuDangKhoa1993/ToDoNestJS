import { IsString } from 'class-validator';
    
export class UserUpdateDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    userName: string;

    @IsString()
    password: string;

    @IsString()
    confirmPassword: string;
}