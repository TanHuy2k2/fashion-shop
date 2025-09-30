import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  async getOverview() {
    return await this.dashboardService.getOverview();
  }

  @Get('revenue/month')
  async getRevenueByMonth() {
    return await this.dashboardService.getRevenueByMonth();
  }

  @Get('revenue/day')
  async getRevenueByDay() {
    return await this.dashboardService.getRevenueByDay();
  }
}
