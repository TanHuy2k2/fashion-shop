import { SubCategoryEntity } from 'src/database/entities/sub-category.entity';

export class SubCategoryMapper {
  static toResponse(subCategory: SubCategoryEntity) {
    return {
      id: subCategory.id,
      name: subCategory.name,
      category: {
        id: subCategory.category.id,
        name: subCategory.category.name,
      },
    };
  }
}
