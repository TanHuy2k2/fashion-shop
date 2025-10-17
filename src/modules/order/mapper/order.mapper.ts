export class OrderMapper {
  static toResponse(order: any) {
    return {
      id: order.id,
      guestName: order.guestName,
      guestPhone: order.guestPhone,
      discountAmount: order.discountAmount,
      finalAmount: order.finalAmount,
      status: order.status,
      orderDetails: order.orderDetail?.map((detail: any) => ({
        id: detail.id,
        productId: detail.productDetail?.id,
        productName: detail.productDetail?.product.name,
        unitPrice: detail.unitPrice,
        quantity: detail.quantity,
        totalPrice: detail.totalPrice,
      })),
      payment: {
        id: order.payment.id,
        status: order.payment.status,
      },
      shipping: order.shipping?.map((shipping: any) => ({
        id: shipping.id,
        shippingAddress: shipping.shippingAddress,
        shippingMethod: shipping.shippingMethod,
        shippingFee: shipping.shippingFee,
        status: shipping.status,
      })),
      coupons:
        order.couponOrder?.map((c: any) => ({
          id: c.coupon?.id,
          code: c.coupon?.code,
          couponType: c.coupon?.couponType,
          couponValue: c.coupon?.couponValue,
          maxDiscount: c.coupon?.maxDiscount,
        })) || [],
    };
  }

  static toUser(order: any) {
    return {
      id: order.id,
      finalAmount: order.finalAmount,
      status: order.status,
      orderDetails: order.orderDetail?.map((detail: any) => ({
        id: detail.id,
        productId: detail.productDetail.id,
        productName: detail.productDetail.product.name,
        image: detail.productDetail.image,
        quantity: detail.quantity,
        review: {
          id: detail.productDetail?.product?.review?.[0]?.id || null,
        },
      })),
      shipping: order.shipping?.map((shipping: any) => ({
        id: shipping.id,
        status: shipping.status,
      })),
    };
  }
}
