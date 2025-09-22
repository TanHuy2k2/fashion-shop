import { BrandInterface } from 'src/modules/brand/interface/brand.interface';
import { SubCategoryInterface } from 'src/modules/sub-category/interface/sub-category.interface';

export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  brand: BrandInterface;
  subCategory: SubCategoryInterface;
}
