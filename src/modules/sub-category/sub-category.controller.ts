import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Controller('sub-category')
export class SubCategoryController {
  constructor(private subCategoryService: SubCategoryService) {}

  @Get()
  findAll() {
    return this.subCategoryService.findAll();
  }

  @Get('find-by-category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.subCategoryService.findByCategoryId(categoryId);
  }

  @Post('create')
  create(@Req() req, @Body() data: CreateSubCategoryDto) {
    const userId = req.user.id;
    return this.subCategoryService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:subCategoryId')
  update(
    @Req() req,
    @Param('subCategoryId') id: string,
    @Body() data: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(id, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Patch('soft-delete/:subCategoryId')
  delete(@Req() req, @Param('subCategoryId') id: string) {
    return this.subCategoryService.softDelete(id, req.user.id);
  }
}
