import { Controller, Post, Body, Get, Query, Res, Req } from '@nestjs/common';
import { MomoService } from './momo.service';
import express from 'express';
import { Public } from 'src/commons/decorators/public.decorator';
import { PaymentService } from '../payment/payment.service';
import { PaymentMethod } from 'src/commons/enums/payment-method.enum';
import { Status } from 'src/commons/enums/status.enum';

@Public()
@Controller('momo')
export class MomoController {
  constructor(
    private readonly momoService: MomoService,
    private readonly paymentService: PaymentService,
  ) {}

  @Post('create')
  async createMomo(@Body() body: { orderId: string; amount: number }) {
    return await this.momoService.createMomoPayment(body.orderId, body.amount);
  }

  @Get('return')
  async momoReturn(
    @Req() req,
    @Query() query: any,
    @Res() res: express.Response,
  ) {
    const userId = req.user ? req.user.id : null;
    if (query.transId) {
      const dataPayment = {
        orderId: String(query.orderId),
        paymentMethod: PaymentMethod.MOMO,
        status: Status.PAID,
        paymentDate: new Date(),
      };

      await this.paymentService.create({
        ...dataPayment,
        updatedBy: userId,
        createdBy: userId,
      });
      return res.redirect(`/order-page`);
    }
    return res.redirect(`/payment-page`);
  }

  @Post('ipn')
  async momoIpn(@Body() body: any) {
    if (body.transId) {
      return { message: 'Payment confirmed' };
    }
    return { message: 'Payment failed' };
  }
}
