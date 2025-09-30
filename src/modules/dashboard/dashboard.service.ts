import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getOverview(): Promise<{ totalSales: number; newOrders: number }> {
    const totalSalesResult = await this.orderRepository
      .createQueryBuilder('o')
      .select('SUM(o.final_amount)', 'totalSales')
      .where('o.deleted_at IS NULL')
      .getRawOne();

    const newOrdersResult = await this.orderRepository
      .createQueryBuilder('o')
      .where('DATE(o.createdAt) = CURDATE()')
      .andWhere('o.deleted_at IS NULL')
      .getCount();

    return {
      totalSales: Number(totalSalesResult.totalSales) || 0,
      newOrders: newOrdersResult,
    };
  }

  async getRevenueByMonth(): Promise<{ month: string; revenue: number }[]> {
    const result = await this.orderRepository
      .createQueryBuilder('o')
      .select("DATE_FORMAT(o.createdAt, '%Y-%m')", 'month')
      .addSelect('SUM(o.final_amount)', 'revenue')
      .where('o.deleted_at IS NULL')
      .groupBy("DATE_FORMAT(o.createdAt, '%Y-%m')")
      .orderBy('month', 'ASC')
      .getRawMany();

    return result.map((row) => ({
      month: row.month,
      revenue: Number(row.revenue),
    }));
  }

  async getRevenueByDay(): Promise<{ day: string; revenue: number }[]> {
    const result = await this.orderRepository
      .createQueryBuilder('o')
      .select('DATE(o.createdAt)', 'day')
      .addSelect('SUM(o.final_amount)', 'revenue')
      .where('o.deleted_at IS NULL')
      .andWhere(
        "DATE_FORMAT(o.createdAt, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m')",
      )
      .groupBy('DATE(o.createdAt)')
      .orderBy('day', 'ASC')
      .getRawMany();

    return result.map((row) => ({
      day: row.day,
      revenue: Number(row.revenue),
    }));
  }
}
