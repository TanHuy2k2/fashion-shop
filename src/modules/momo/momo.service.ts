import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class MomoService {
  async createMomoPayment(orderId: string, amount: number) {
    const partnerCode = process.env.MOMO_PARTNER_CODE;
    const accessKey = process.env.MOMO_ACCESS_KEY;
    const secretKey = process.env.MOMO_SECRET_KEY;
    const redirectUrl = process.env.REDIRECT_URL;
    const ipnUrl = process.env.IPN_URL;
    const endpoint = process.env.MOMO_ENDPOINT;
    const requestId = Date.now().toString();
    const orderInfo = `Thanh toán đơn hàng ${orderId}`;
    if (
      !partnerCode ||
      !accessKey ||
      !secretKey ||
      !redirectUrl ||
      !ipnUrl ||
      !endpoint
    ) {
      throw new BadRequestException('Missing MoMo environment configuration');
    }

    const extraPayload = orderId ? { orderId, amount } : {};
    const extraData = Buffer.from(JSON.stringify(extraPayload)).toString(
      'base64',
    );
    const requestType = 'payWithMethod';
    const rawSignature =
      `accessKey=${accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;
    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
    const requestBody = {
      partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount: amount.toString(),
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang: 'vi',
      requestType,
      autoCapture: true,
      extraData,
      orderGroupId: '',
      signature,
    };

    try {
      const response = await axios.post(endpoint, requestBody, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      throw new BadRequestException(`MoMo request failed: ${error.message}`);
    }
  }
}
