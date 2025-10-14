import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Get('/:date')
  get(@Req() req, @Param('date') date: string) {
    return this.couponService.findAll(date, req.user.id);
  }

  @Post('create')
  create(@Req() req, @Body() data: CreateCouponDto) {
    const userId = req.user.id;
    return this.couponService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:couponId')
  update(
    @Req() req,
    @Param('couponId') couponId: string,
    @Body() data: UpdateCouponDto,
  ) {
    return this.couponService.update(couponId, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Delete('delete/:couponId')
  delete(@Req() req, @Param('couponId') couponId: string) {
    return this.couponService.delete(couponId, req.user.id);
  }
}
