import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './interface/user.interface';
import { RegisterDto } from './dto/register.dto';
import { DEFAULT_IMAGE, SALT_OF_ROUND } from 'src/constants/constant';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import { Request } from 'express';
import { UpdateInfoDto } from './dto/update-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async findOneById(id: string): Promise<UserInterface | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<UserInterface | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneByPhone(phone: string): Promise<UserInterface | null> {
    return await this.userRepository.findOneBy({ phone });
  }

  async register(data: RegisterDto) {
    const { email, password, rePassword, phone, agreeTerm, ...newUser } = data;
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

    const hashedPassword = await bcrypt.hash(password, SALT_OF_ROUND);
    return await this.userRepository.save({
      email,
      password: hashedPassword,
      image: DEFAULT_IMAGE,
      phone,
      ...newUser,
    });
  }

  async login(data: LoginDto, req: Request) {
    const { email, password } = data;
    const user = await this.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Account not activated!');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException("Password isn't correct!");

    const payload = { id: user.id, name: user.fullName };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1d',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    await this.redis.set(
      `session:${user.id}`,
      JSON.stringify({
        refreshToken: await bcrypt.hash(refreshToken, SALT_OF_ROUND),
        userAgent: req.headers['user-agent'],
        ip: req.ip,
        createdAt: Date.now(),
      }),
      'EX',
      7 * 24 * 60 * 60,
    );

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string, req: Request) {
    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException('Expired or invalid refresh token');
    }

    const userId = payload.id;
    const session = await this.redis.get(`session:${userId}`);
    if (!session) throw new UnauthorizedException('Session not found');

    const parsed = JSON.parse(session);
    const match = await bcrypt.compare(refreshToken, parsed.refreshToken);
    if (!match) throw new ForbiddenException('Token mismatch');

    const currentIp = req.ip;
    if (parsed.ip !== currentIp) {
      throw new ForbiddenException('IP mismatch');
    }

    const currentUA = req.headers['user-agent'];
    if (parsed.userAgent !== currentUA) {
      throw new ForbiddenException('Device mismatch');
    }

    const newPayload = {
      id: payload.id,
      name: payload.name,
    };
    const newAccessToken = await this.jwtService.signAsync(newPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '1d',
    });

    return { accessToken: newAccessToken };
  }

  async logout(userId: string) {
    await this.redis.del(`session:${userId}`);
    return { success: true };
  }

  async update(userId: string, data: UpdateInfoDto) {
    try {
      const userById = await this.findOneById(userId);
      if (!userById) {
        throw new NotFoundException(`User with user id=${userId} not found`);
      }

      const user = await this.findOneByEmail(data.email);
      if (user) {
        throw new ConflictException('Email already existed!');
      } 

      return await this.userRepository.save({ id: userId, ...data });
    } catch (error) {
      throw error;
    }
  }
}
