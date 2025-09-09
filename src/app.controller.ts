import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  home() {
    return { title: 'Website' };
  }

  @Get('/login')
  @Render('login')
  loginPage() {
    return { title: 'Login' };
  }

  @Get('/register')
  @Render('register')
  registerPage() {
    return { title: 'register' };
  }
}
