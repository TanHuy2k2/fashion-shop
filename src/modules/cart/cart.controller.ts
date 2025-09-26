import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { Public } from 'src/commons/decorators/public.decorator';

@Public()
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/:cartId')
  get(@Param('cartId') cartId: string) {
    return this.cartService.getCart(cartId);
  }

  @Post('add/:cartId')
  add(@Param('cartId') cartId: string, @Body() data: CartDto) {
    return this.cartService.addItem(cartId, data);
  }

  @Patch('update/:cartId')
  update(@Param('cartId') cartId: string, @Body() data: CartDto) {
    return this.cartService.updateItem(cartId, data);
  }

  @Delete('remove/:cartId/:productDetailId')
  removeItem(
    @Param('cartId') cartId: string,
    @Param('productDetailId') productDetailId: string,
  ) {
    return this.cartService.removeItem(cartId, productDetailId);
  }

  @Delete('delete/:cartId')
  delete(@Param('cartId') cartId: string) {
    return this.cartService.delete(cartId);
  }
}
