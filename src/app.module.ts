import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './database/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './commons/guards/auth.guard';
import { RolesGuard } from './commons/guards/roles.guard';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { ProductModule } from './modules/product/product.module';
import { ColorModule } from './modules/color/color.module';
import { ProductDetailModule } from './modules/product-detail/product-detail.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { OrderDetailModule } from './modules/order-detail/order-detail.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { PaymentModule } from './modules/payment/payment.module';
import { MomoModule } from './modules/momo/momo.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ChatModule } from './modules/chat/chat.module';
import { ReviewModule } from './modules/review/review.module';
import { DiscountModule } from './modules/discount/discount.module';
import { ProductDiscountModule } from './modules/product-discount/product-discount.module';

@Module({
  imports: [
    UserModule,
    AdminModule,
    CategoryModule,
    BrandModule,
    SubCategoryModule,
    ProductModule,
    ColorModule,
    ProductDetailModule,
    CartModule,
    OrderModule,
    OrderDetailModule,
    ShippingModule,
    PaymentModule,
    MomoModule,
    DashboardModule,
    ChatModule,
    ReviewModule,
    DiscountModule,
    ProductDiscountModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
