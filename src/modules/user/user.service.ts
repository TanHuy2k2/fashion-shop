import {
  BadRequestException,
  ConflictException,
  Injectable,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './interface/user.interface';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async findOneByEmail(email: string): Promise<UserInterface | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneByPhone(phone: string): Promise<UserInterface | null> {
    return await this.userRepository.findOneBy({ phone });
  }

  async register(data: RegisterDto) {
    const { email, password, rePassword, phone, agreeTerm, ...rest } = data;
    const checkEmail = await this.findOneByEmail(email);
    if (checkEmail) {
      throw new ConflictException('Email already existed!');
    }

    const checkPhone = await this.findOneByPhone(phone);
    if (checkPhone) {
      throw new ConflictException('Phone already existed!');
    }

    if (password !== rePassword) {
      throw new BadRequestException('Passwords do not match');
    }

    if (!agreeTerm) {
      throw new BadRequestException('Please agree terms!');
    }

    return await this.userRepository.save({ email, password, phone, ...rest });
  }
}
