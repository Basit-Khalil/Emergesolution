import crypto from 'crypto';
import {
  PaymentOrderRequest,
  PaymentOrderResponse,
  RevolutOrderApiResponse,
} from '@/types/payment';

type CreateOrderInput = PaymentOrderRequest;

export function initRevolutClient() {
  const baseUrl =
    process.env.REVOLUT_ENV === 'sandbox'
      ? 'https://sandbox-merchant.revolut.com/api/1.0'
      : 'https://merchant.revolut.com/api/1.0';

  const apiKey = process.env.REVOLUT_ACCESS_TOKEN;
  const webhookSecret = process.env.REVOLUT_WEBHOOK_SECRET;

  if (!apiKey) throw new Error('REVOLUT_ACCESS_TOKEN missing');

  async function request<T>(path: string, options: RequestInit): Promise<T> {
    const res = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...options.headers,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Revolut API error (${res.status}): ${text}`);
    }

    return res.json() as Promise<T>;
  }

  return {
    // =========================
    // CREATE ORDER
    // =========================
    async createOrder(
      input: CreateOrderInput
    ): Promise<PaymentOrderResponse> {
      const payload = {
        amount: input.amount,
        currency: input.currency || 'USD',
        merchant_order_ext_ref: input.orderReference,
        description: input.description,
        customer: {
          email: input.customerEmail,
          full_name: input.customerName,
        },
      };

      const data: RevolutOrderApiResponse =
        await request<RevolutOrderApiResponse>('/orders', {
          method: 'POST',
          body: JSON.stringify(payload),
        });

      console.log('[REVOLUT_RAW_RESPONSE]', data);

      const result: PaymentOrderResponse = {
        id: data.id,
        status: data.state,
        checkoutUrl: data.checkout_url,
        createdAt: data.created_at,
      };

      if (!result.checkoutUrl) {
        throw new Error(
          'No checkout URL received from Revolut. Full response: ' +
            JSON.stringify(data)
        );
      }

      return result;
    },

    // =========================
    // VERIFY WEBHOOK SIGNATURE
    // =========================
    verifyWebhookSignature(
      payload: string,
      signature: string,
      timestamp: string
    ): boolean {
      if (!webhookSecret) {
        console.warn(
          'REVOLUT_WEBHOOK_SECRET not set — skipping signature verification'
        );
        return true; // allow in dev
      }

      const signedPayload = `${timestamp}.${payload}`;

      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(signedPayload)
        .digest('hex');

      return crypto.timingSafeEqual(
        Buffer.from(expectedSignature),
        Buffer.from(signature)
      );
    },
  };
}
