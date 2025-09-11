import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/commons/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: LoginDto, @Req() req) {
    return this.userService.login(body, req);
  }

  @Public()
  @Post('refresh')
  async refresh(@Req() req) {
    const refreshToken = req.headers['refreshtoken'];
    return await this.userService.refreshToken(refreshToken, req);
  }

  @Get('logout/:id')
  logout(@Param('id') id: string) {
    return this.userService.logout(id);
  }
}
