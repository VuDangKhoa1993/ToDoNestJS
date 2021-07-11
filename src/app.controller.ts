import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { AuthService } from '@modules/auth/services/auth/auth.service';
import { UserDto } from '@modules/user/dtos/user.dto';
import { UserCreateDto } from '@modules/user/dtos/usercreate.dto';
import { UserService } from '@modules/user/services/user/user.service';
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { Public } from '@shared/custom-decorators/isPublic';
import { ValidationPipe } from '@shared/pipes/validation.pipe';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Get()
  async getHelloWorld() {
    return 'Hello world!';
  }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  public async create(@Body(new ValidationPipe()) createUserDto: UserCreateDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }
  
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
