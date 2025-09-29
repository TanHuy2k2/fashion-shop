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
    };
  }
}
