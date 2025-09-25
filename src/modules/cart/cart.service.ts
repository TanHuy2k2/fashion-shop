import { Inject, Injectable, Req } from '@nestjs/common';
import Redis from 'ioredis';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  private getCartKey(cartId: string) {
    return `cart:${cartId}`;
  }

  async getCart(cartId: string) {
    const cartJson = await this.redis.get(this.getCartKey(cartId));
    return cartJson ? JSON.parse(cartJson) : [];
  }

  async addItem(cartId: string, data: CartDto) {
    const cart = await this.getCart(cartId);
    const existing = cart.find((item) => item.productDetailId === data.productDetailId);
    if (existing) {
      existing.quantity += data.quantity;
    } else {
      cart.push(data);
    }

    return await this.redis.set(this.getCartKey(cartId), JSON.stringify(cart));
  }

  async updateItem(cartId: string, data: CartDto) {
    const cart = await this.getCart(cartId);
    const item = cart.find((i) => i.productDetailId === data.productDetailId);
    if (item) item.quantity = data.quantity;

    return await this.redis.set(this.getCartKey(cartId), JSON.stringify(cart));
  }

  async removeItem(cartId: string, productDetailId: string) {
    let cart = await this.getCart(cartId);
    cart = cart.filter((i) => i.productDetailId !== productDetailId);

    return await this.redis.set(this.getCartKey(cartId), JSON.stringify(cart));
  }
}
