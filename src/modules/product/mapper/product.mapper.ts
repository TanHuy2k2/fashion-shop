import { ProductEntity } from 'src/database/entities/product.entity';

export class ProductMapper {
  static toResponse(product: ProductEntity) {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      brand: {
        id: product.brand.id,
        name: product.brand.name,
      },
      subCategory: {
        id: product.subCategory.id,
        name: product.subCategory.name,
        category: {
          id: product.subCategory.category.id,
          name: product.subCategory.category.name,
        },
      },
      productDetail:
        product.productDetail?.map((detail) => ({
          id: detail.id,
          size: detail.size,
          color: {
            name: detail.color.name,
            hexCode: detail.color.hexCode,
          },
          image: detail.image,
          price: detail.price,
          stock: detail.stock,
        })) ?? [],
      productDiscount:
        product.productDiscount?.map((productDiscount) => ({
          name: productDiscount.discount.name,
          percent: productDiscount.discount.percent,
          startDate: productDiscount.discount.startDate,
          endDate: productDiscount.discount.endDate,
        })) ?? [],
    };
  }
}
