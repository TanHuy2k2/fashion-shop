import { DiscountScope } from 'src/commons/enums/discount-scope.enum';

export interface DiscountInterface {
  id: string;
  name: string;
  percent: number;
  startDate: Date;
  endDate: Date;
  scope: DiscountScope;
}
