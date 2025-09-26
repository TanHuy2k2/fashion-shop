import { Controller, Get, Post, Render } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';

@Controller('admin')
export class AdminController {
  @Public()
  @Get()
  @Render('admin/login-page')
  login() {
    return { layout: 'login-admin-layout', title: 'Login' };
  }

  @Public()
  @Get('dashboard')
  @Render('admin/dashboard-page')
  dashboard() {
    return { isDashboard: true, layout: 'admin-layout', title: 'Dashboard' };
  }

  @Roles(Role.ADMIN)
  @Post('check-role')
  checkRole() {
    return { success: true };
  }

  @Public()
  @Get('categories')
  @Render('admin/category-page')
  category() {
    return { isCategories: true, layout: 'admin-layout', title: 'Categories' };
  }

  @Public()
  @Get('products')
  @Render('admin/product-page')
  product() {
    return { isProducts: true, layout: 'admin-layout', title: 'Product' };
  }

  @Public()
  @Get('orders')
  @Render('admin/order-page')
  order() {
    return { isOrders: true, layout: 'admin-layout', title: 'Order' };
  }
}
