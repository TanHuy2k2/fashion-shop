import { OrderInterface } from 'src/modules/order/interface/order.interface';
import { ProductDetailInterface } from 'src/modules/product-detail/interface/product-detail.interface';

export class OrderDetailInterface {
  order: OrderInterface;
  productDetail: ProductDetailInterface;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}
