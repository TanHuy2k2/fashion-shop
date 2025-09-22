import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Public } from 'src/commons/decorators/public.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Public()
  @Get('findAll')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/:page')
  get(@Param('page') page: number) {
    return this.categoryService.findByPage(page);
  }

  @Post('create')
  create(@Req() req, @Body() data: CreateCategoryDto) {
    const userId = req.user.id;
    return this.categoryService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:categoryId')
  update(
    @Req() req,
    @Param('categoryId') id: string,
    @Body() data: UpdateCategoryDto,
  ) {
    const userId = req.user.id;
    return this.categoryService.update(id, {
      ...data,
      updatedBy: userId,
    });
  }

  @Patch('soft-delete/:categoryId')
  softDelete(@Req() req, @Param('categoryId') id: string) {
    return this.categoryService.softDelete(id, req.user.id);
  }

  @Patch('disable/:categoryId')
  disable(@Req() req, @Param('categoryId') id: string) {
    return this.categoryService.updateStatus(id, req.user.id, false);
  }

  @Patch('restore-status/:categoryId')
  restore(@Req() req, @Param('categoryId') id: string) {
    return this.categoryService.updateStatus(id, req.user.id, true);
  }
}
