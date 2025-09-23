import { ColorInterface } from 'src/modules/color/interface/color.interface';
import { ProductInterface } from 'src/modules/product/interface/product.interface';

export interface ProductDetailInterface {
  id: string;
  product: ProductInterface;
  color: ColorInterface;
  size: string;
  image: string;
  price: number;
  stock: number;
}
