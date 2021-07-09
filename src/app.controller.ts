import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '@modules/auth/guards/local-auth.guard';
import { AuthService } from '@modules/auth/services/auth/auth.service';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Public } from '@shared/custom-decorators/isPublic';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
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

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
