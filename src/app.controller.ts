import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './commons/decorators/public.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  home() {
    return { title: 'Website' };
  }

  @Get('login')
  @Render('login')
  loginPage() {
    return { title: 'Login' };
  }

  @Get('register')
  @Render('register')
  registerPage() {
    return { title: 'register' };
  }

  @Get('profile')
  @Render('profile')
  profile() {
    return { title: 'profile' };
  }

  @Get('forgot-password')
  @Render('forgot-password')
  forgotPassword() {
    return { title: 'Forgot password' };
  }

  @Get('change-password')
  @Render('change-password')
  changePassword() {
    return { title: 'Change password' };
  }

  @Get('product-page/:subCategoryName')
  @Render('product')
  product(@Param('subCategoryName') subCategoryName: string) {
    return { title: 'Product', subCategoryName };
  }

  @Get('detail-product-page/:productName')
  @Render('detail-product')
  detailProduct(@Param('productName') productName: string) {
    return { title: 'Detail-Product', productName };
  }

  @Get('cart-page')
  @Render('cart')
  cart() {
    return { title: 'Cart' };
  }

  @Get('shipping-page')
  @Render('shipping')
  shipping() {
    return { title: 'Shipping' };
  }

  @Get('payment-page')
  @Render('payment')
  payment() {
    return { title: 'Payment' };
  }

  @Get('order-page')
  @Render('order')
  order() {
    return { title: 'Order' };
  }

  @Get('order-detail-page/:orderId')
  @Render('order-detail')
  orderDetail(@Param('orderId') orderId :string) {
    return { title: 'Order-Detail', orderId };
  }
}
