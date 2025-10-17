import { Body, Controller, Post, Req } from '@nestjs/common';
import { CouponOrderService } from './coupon-order.service';
import { CouponOrderDto } from './dto/coupon-order.dto';

@Controller('coupon-order')
export class CouponOrderController {
  constructor(private couponOrderService: CouponOrderService) {}

  @Post('create')
  create(@Req() req, @Body() data: CouponOrderDto) {
    const userId = req.user.id;
    return this.couponOrderService.create({
      ...data,
      updatedBy: userId,
      createdBy: userId,
    });
  }
}
