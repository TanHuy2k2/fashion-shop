export class CouponMapper {
  static toResponse(coupon: any) {
    return {
      id: coupon.id,
      code: coupon.code,
      couponType: coupon.couponType,
      couponValue: coupon.couponValue,
      maxDiscount: coupon.maxDiscount,
      minOrderValue: coupon.minOrderValue,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
    };
  }
}
