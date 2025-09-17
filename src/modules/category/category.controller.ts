import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Roles(Role.ADMIN)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/:page')
  get(@Param('page') page: number) {
    return this.categoryService.findAll(page);
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
}
