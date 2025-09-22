import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/:page')
  findAll(@Param('page') page: number) {
    return this.productService.findAll(page);
  }

  @Get('find-by-name/:productName')
  findByCategory(@Param('productName') productName: string) {
    return this.productService.findByName(productName);
  }

  @Post('create')
  create(@Req() req, @Body() data: ProductDto) {
    const userId = req.user.id;
    return this.productService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:productId')
  update(
    @Param('productId') productId: string,
    @Req() req,
    @Body() data: ProductDto,
  ) {
    const userId = req.user.id;
    return this.productService.update(productId, {
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('soft-delete/:productId')
  delete(@Req() req, @Param('productId') id: string) {
    return this.productService.softDelete(id, req.user.id);
  }
}
