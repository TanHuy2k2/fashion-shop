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
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { Public } from 'src/commons/decorators/public.decorator';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get('get/:page')
  get(@Param('page') page: number) {
    return this.discountService.getByPage(page);
  }

  @Public()
  @Get('/:date')
  getActiveDiscount(@Param('date') dateString: string) {
    return this.discountService.getActiveDiscount(new Date(dateString));
  }

  @Post('create')
  create(@Req() req, @Body() data: CreateDiscountDto) {
    const userId = req.user.id;
    return this.discountService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:discountId')
  update(
    @Req() req,
    @Param('discountId') id: string,
    @Body() data: UpdateDiscountDto,
  ) {
    return this.discountService.update(id, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Delete('delete/:discountId')
  softDelete(@Req() req, @Param('discountId') id: string) {
    return this.discountService.softDelete(id, req.user.id);
  }
}
