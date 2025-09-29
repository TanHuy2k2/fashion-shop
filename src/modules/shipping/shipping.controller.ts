import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import { ShippingService } from './shipping.service';
import { ShippingDto } from './dto/shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private shippingService: ShippingService) {}

  @Public()
  @Post('create')
  create(@Req() req, @Body() data: ShippingDto) {
    const userId = req.user ? req.user.id : null;
    return this.shippingService.create({
      ...data,
      updatedBy: userId,
      createdBy: userId,
    });
  }
}
