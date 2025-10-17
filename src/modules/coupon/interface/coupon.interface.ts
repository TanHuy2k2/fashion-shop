import { CouponType } from 'src/commons/enums/coupon-type.enum';

export interface CouponInterface {
  id: string;
  code: string;
  couponType: CouponType;
  couponValue: number;
  maxDiscount: number | null;
  minOrderValue: number | null;
  usageLimit: number;
  usedCount: number;
  startDate: Date;
  endDate: Date;
}
