import { CouponInterface } from 'src/modules/coupon/interface/coupon.interface';
import { OrderInterface } from 'src/modules/order/interface/order.interface';

export class CouponOrderInterface {
  coupon: CouponInterface;
  order: OrderInterface;
  usedAt: Date;
}
