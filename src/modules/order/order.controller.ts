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
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { Status } from 'src/commons/enums/status.enum';
import { Public } from 'src/commons/decorators/public.decorator';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('page/:page')
  findAll(@Param('page') page: number) {
    return this.orderService.findAll(page);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.orderService.findByUserId(userId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Public()
  @Post('create')
  create(@Req() req, @Body() data: OrderDto) {
    const userId = req.user ? req.user.id : null;
    return this.orderService.create({
      ...data,
      updatedBy: userId,
      createdBy: userId,
    });
  }

  @Patch('update-status/:id')
  updateStatus(
    @Req() req,
    @Param('id') id: string,
    @Body('status') status: Status,
  ) {
    return this.orderService.updateStatus(id, status, req.user.id);
  }

  @Delete('delete/:id')
  delete(@Req() req, @Param('id') id: string) {
    return this.orderService.softDelete(id, req.user.id);
  }
}
