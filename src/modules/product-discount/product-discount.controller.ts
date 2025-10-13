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
import { ProductDiscountService } from './product-discount.service';
import { CreateProductDiscountDto } from './dto/create-product-discount.dto';
import { UpdateProductDiscountDto } from './dto/update-product-discount.dto';

@Controller('product-discount')
export class ProductDiscountController {
  constructor(
    private readonly productDiscountService: ProductDiscountService,
  ) {}

  @Get('/:discountId')
  getByDiscount(@Param('discountId') discountId: string) {
    return this.productDiscountService.findByDiscountId(discountId);
  }

  @Post('create')
  create(@Req() req, @Body() data: CreateProductDiscountDto) {
    const userId = req.user.id;
    return this.productDiscountService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:productDiscountId')
  update(
    @Req() req,
    @Param('productDiscountId') id: string,
    @Body() data: UpdateProductDiscountDto,
  ) {
    return this.productDiscountService.update(id, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Delete('delete/:discountId')
  delete(@Param('discountId') discountId: string) {
    return this.productDiscountService.delete(discountId);
  }
}
