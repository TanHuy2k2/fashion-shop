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
    };
  }
}
