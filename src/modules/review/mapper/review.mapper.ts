export class ReviewMapper {
  static toResponse(review: any) {
    return {
      id: review.id,
      comment: review.comment,
      rating: review.rating,
      user: {
        id: review.user.id,
        fullName: review.user.fullName,
      },
      product: {
        id: review.product.id,
        name: review.product.name,
      },
      createAt: review.createAt,
      updateAt: review.updateAt,
    };
  }
}
