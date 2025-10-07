import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Public } from 'src/commons/decorators/public.decorator';
import { SortBy } from 'src/commons/enums/sort-by.enum';

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

  @Public()
  @Get('find-by-id/:productId')
  findById(@Param('productId') productId: string) {
    return this.productService.findById(productId);
  }

  @Public()
  @Get('find-one-by-name/:productName')
  findOneByName(@Param('productName') productName: string) {
    return this.productService.findOneByName(productName);
  }

  @Public()
  @Get('search/:keyword/:numberPage')
  async search(
    @Param('keyword') keyword: string,
    @Param('numberPage') page: number,
    @Query('sortBy') sortBy?: SortBy,
  ) {
    return this.productService.search(keyword, page, sortBy);
  }

  @Public()
  @Get('find-by-sub-category/:subCategoryId/:numberPage')
  async findBySubCategory(
    @Param('subCategoryId') subCategoryId: string,
    @Param('numberPage') page: number,
    @Query('sortBy') sortBy?: SortBy,
  ) {
    return this.productService.findBySubCategory(subCategoryId, page, sortBy);
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
