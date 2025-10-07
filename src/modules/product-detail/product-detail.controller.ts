import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';
import { CreateProductDetailDto } from './dto/create-product-detail.dto';
import { UploadImageInterceptor } from 'src/commons/interceptors/upload-image.interceptor';
import { downloadImage } from 'src/utils/downloadImage';
import { UpdateProductDetailDto } from './dto/update-product-detail.dto';
import { Public } from 'src/commons/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private productDetailService: ProductDetailService) {}

  @Get('/:productId')
  get(@Param('productId') productId: string) {
    return this.productDetailService.findByProductId(productId);
  }

  @Public()
  @Get('find-by-id/:productDetailId')
  findById(@Param('productDetailId') productDetailId: string) {
    return this.productDetailService.findById(productDetailId);
  }

  @UseInterceptors(FileInterceptor('file', { dest: './public/uploads' }))
  @Post('import')
  async importCsv(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.productDetailService.import(req.user.id, file.path);
  }

  @UseInterceptors(UploadImageInterceptor('image'))
  @Post('create')
  async create(
    @Req() req,
    @Body() data: CreateProductDetailDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const userId = req.user.id;
    const image = file
      ? `/images/uploads/${file.filename}`
      : await downloadImage(data.image);
    return this.productDetailService.create({
      ...data,
      ...(image && { image }),
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:productDetailId')
  update(
    @Req() req,
    @Param('productDetailId') id: string,
    @Body() data: UpdateProductDetailDto,
  ) {
    return this.productDetailService.update(id, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Patch('soft-delete/:productDetailId')
  delete(@Req() req, @Param('productDetailId') id: string) {
    return this.productDetailService.softDelete(id, req.user.id);
  }
}
