import { ProductDetailEntity } from 'src/database/entities/product-detail.entity';

export class ProductDetailMapper {
  static toResponse(productDetail: ProductDetailEntity) {
    return {
      id: productDetail.id,
      product: {
        id: productDetail.product.id,
        name: productDetail.product.name,
        description: productDetail.product.description,
        brand: {
          id: productDetail.product.brand.id,
          name: productDetail.product.brand.name,
        },
        subCategory: {
          id: productDetail.product.subCategory.id,
          name: productDetail.product.subCategory.name,
          category: {
            id: productDetail.product.subCategory.category.id,
            name: productDetail.product.subCategory.category.name,
          },
        },
      },
      image: productDetail.image,
      size: productDetail.size,
      price: productDetail.price,
      color: {
        id: productDetail.color.id,
        name: productDetail.color.name,
        hexCode: productDetail.color.hexCode,
      },
      stock: productDetail.stock,
    };
  }
}
