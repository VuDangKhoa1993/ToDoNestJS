import { UserDto } from '@modules/user/dtos/user.dto';
import { UserService } from '@modules/user/services/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);
    if (user && user.length > 0 && user[0].password === password) {
      const { password, confirmPassword, ...result } = user[0];
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.userName, userId: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user
    };
  }
}
