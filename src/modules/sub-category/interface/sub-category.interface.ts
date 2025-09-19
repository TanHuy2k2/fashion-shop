import { CategoryInterface } from 'src/modules/category/interface/category.interface';

export interface SubCategoryInterface {
  id: string;
  name: string;
  category: CategoryInterface;
}
