import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { ColorService } from './color.service';
import { Roles } from 'src/commons/decorators/roles.decorator';
import { Role } from 'src/commons/enums/role.enum';
import { ColorDto } from './dto/color.dto';

@Roles(Role.ADMIN)
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  get() {
    return this.colorService.findAll();
  }

  @Post('create')
  create(@Req() req, @Body() data: ColorDto) {
    const userId = req.user.id;
    return this.colorService.create({
      ...data,
      createdBy: userId,
      updatedBy: userId,
    });
  }

  @Patch('update/:colorId')
  update(@Req() req, @Param('colorId') id: string, @Body() data: ColorDto) {
    return this.colorService.update(id, {
      ...data,
      updatedBy: req.user.id,
    });
  }

  @Patch('soft-delete/:colorId')
  softDelete(@Req() req, @Param('colorId') id: string) {
    return this.colorService.softDelete(id, req.user.id);
  }
}
