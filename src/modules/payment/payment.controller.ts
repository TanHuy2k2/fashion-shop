import { Body, Controller, Param, Patch, Post, Req } from '@nestjs/common';
import { Public } from 'src/commons/decorators/public.decorator';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { PaymentMethod } from 'src/commons/enums/payment-method.enum';
import { Status } from 'src/commons/enums/status.enum';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Public()
  @Post('create')
  create(@Req() req, @Body() data: PaymentDto) {
    const userId = req.user ? req.user.id : null;
    return this.paymentService.create({
      ...data,
      updatedBy: userId,
      createdBy: userId,
    });
  }

  @Patch('update-payment/:id/:paymentMethod')
  updatePayment(
    @Param('id') id: string,
    @Param('paymentMethod') paymentMethod: PaymentMethod,
  ) {
    return this.paymentService.updatePayment(id, paymentMethod);
  }

  @Patch('update-status/:id/:status')
  updateStatus(@Param('id') id: string, @Param('status') status: Status) {
    return this.paymentService.updateStatus(id, status);
  }
}
