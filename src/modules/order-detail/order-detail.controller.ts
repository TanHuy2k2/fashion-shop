import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import { OrderDetailService } from './order-detail.service';
import { OrderDetailDto } from './dto/order-detail.dto';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private orderDetailService: OrderDetailService) {}

  @Public()
  @Post('create')
  create(@Req() req, @Body() data: OrderDetailDto) {
    const userId = req.user ? req.user.id : null;
    return this.orderDetailService.create({
      ...data,
      updatedBy: userId,
      createdBy: userId,
    });
  }
}
