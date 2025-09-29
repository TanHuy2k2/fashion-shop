import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShippingEntity } from 'src/database/entities/shipping.entity';
import { ShippingController } from './shipping.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ShippingEntity])],
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
