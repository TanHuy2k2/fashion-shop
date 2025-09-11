import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/commons/decorators/public.decorator';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { UpdateInfoDto } from './dto/update-info.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('find/:id')
  findById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

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

  @UseInterceptors(UploadImageInterceptor('image'))
  @Patch('update/:id')
  update(
    @Param('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateInfoDto,
  ) {
    const image = file ? `/images/uploads/${file.filename}` : undefined;
    return this.userService.update(userId, {
      ...data,
      ...(image && { image }),
    });
  }
}
