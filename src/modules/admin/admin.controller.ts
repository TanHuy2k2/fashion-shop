import { Controller, Get, Post, Render } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';

@Controller('admin')
export class AdminController {
  @Public()
  @Get()
  @Render('admin/login')
  login() {
    return { layout: 'login-admin', title: 'Login' };
  }

  @Public()
  @Get('dashboard')
  @Render('admin/dashboard')
  dashboard() {
    return { isDashboard: true, layout: 'admin', title: 'Dashboard' };
  }

  @Roles(Role.ADMIN)
  @Post('check-role')
  checkRole() {
    return { success: true };
  }

  @Public()
  @Get('products')
  @Render('admin/product')
  product() {
    return { isProducts: true, layout: 'admin', title: 'Product' };
  }
}
