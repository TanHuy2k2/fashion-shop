import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorEntity } from 'src/database/entities/color.entity';
import { Repository } from 'typeorm';
import { ColorInterface } from './interface/color.interface';
import { ColorDto } from './dto/color.dto';
import { getHexFromName } from 'src/utils/color';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(ColorEntity)
    private colorRepository: Repository<ColorEntity>,
  ) {}

  async findAll(): Promise<ColorInterface[]> {
    return await this.colorRepository.find();
  }

  async findByName(colorName: string): Promise<ColorInterface | null> {
    return await this.colorRepository.findOneBy({ name: colorName });
  }

  async findById(id: string): Promise<ColorInterface | null> {
    return await this.colorRepository.findOneBy({ id });
  }

  async create(data: ColorDto): Promise<ColorInterface> {
    try {
      const { name } = data;
      const color = await this.findByName(name);
      if (color) {
        throw new ConflictException(`This color name already exists!`);
      }

      const hexCode = getHexFromName(name);
      if (!hexCode) {
        throw new NotFoundException(`No have color with name = ${name}`);
      }

      return await this.colorRepository.save({
        ...data,
        hexCode,
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: ColorDto): Promise<ColorInterface> {
    try {
      const { name } = data;
      const colorById = await this.findById(id);
      if (!colorById) {
        throw new NotFoundException(`No have color with id = ${id}`);
      }

      const colorByName = await this.findByName(name);
      if (colorByName && id !== colorByName.id) {
        throw new ConflictException(`This color name already exists!`);
      }

      const hexCode = getHexFromName(name);
      if (!hexCode) {
        throw new NotFoundException(`No have color with name = ${name}`);
      }

      return await this.colorRepository.save({
        id,
        ...data,
        hexCode,
      });
    } catch (error) {
      throw error;
    }
  }

  async softDelete(id: string, userId: string): Promise<ColorInterface> {
    try {
      const colorById = await this.findById(id);
      if (!colorById) {
        throw new NotFoundException(`No have color with id = ${id}`);
      }

      return await this.colorRepository.save({
        id,
        deletedAt: new Date(),
        updatedBy: userId,
      });
    } catch (error) {
      throw error;
    }
  }
}
