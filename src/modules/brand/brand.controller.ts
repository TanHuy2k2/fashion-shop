import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { BrandDto } from './dto/brand.dto';

@Roles(Role.ADMIN)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  get() {
    return this.brandService.findAll();
  }

  @Post('create')
  create(@Req() req, @Body() data: BrandDto) {
    const userId = req.user.id;
    return this.brandService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:brandId')
  update(@Req() req, @Param('brandId') id: string, @Body() data: BrandDto) {
    return this.brandService.update(id, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Patch('soft-delete/:brandId')
  softDelete(@Req() req, @Param('brandId') id: string) {
    return this.brandService.updateDeleteStatus(id, req.user.id, true);
  }

  @Patch('restore/:brandId')
  restore(@Req() req, @Param('brandId') id: string) {
    return this.brandService.updateDeleteStatus(id, req.user.id, false);
  }
}
