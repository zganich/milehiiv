import Stripe from 'stripe';

export type CheckoutTier = 'pay-per-report' | 'monthly';

export type CheckoutPlan = {
  key: CheckoutTier;
  name: string;
  description: string;
  cta: string;
  mode: 'payment' | 'subscription';
  priceIdEnv: 'STRIPE_PAY_PER_REPORT_PRICE_ID' | 'STRIPE_MONTHLY_PRICE_ID';
};

export const checkoutPlans: Record<CheckoutTier, CheckoutPlan> = {
  'pay-per-report': {
    key: 'pay-per-report',
    name: 'Pay-per-report',
    description: 'Generate reports as you need them. Perfect for drivers who want flexibility and control.',
    cta: 'Start checkout',
    mode: 'payment',
    priceIdEnv: 'STRIPE_PAY_PER_REPORT_PRICE_ID',
  },
  monthly: {
    key: 'monthly',
    name: 'Monthly',
    description: 'Power users who generate reports regularly. Unlimited reports. One predictable price.',
    cta: 'Start checkout',
    mode: 'subscription',
    priceIdEnv: 'STRIPE_MONTHLY_PRICE_ID',
  },
};

let stripeClient: Stripe | null = null;

export function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error('Missing STRIPE_SECRET_KEY. Add it to your environment before using checkout.');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function getCheckoutPlan(tier: string) {
  return checkoutPlans[tier as CheckoutTier] ?? null;
}

export function getCheckoutPriceId(tier: CheckoutTier) {
  const plan = checkoutPlans[tier];
  const priceId = process.env[plan.priceIdEnv];

  if (!priceId) {
    throw new Error(`Missing ${plan.priceIdEnv}. Add the Stripe Price ID for ${plan.name} checkout.`);
  }

  return priceId;
}

export function getAppUrl(request?: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (request) {
    return new URL(request.url).origin;
  }

  throw new Error('Missing NEXT_PUBLIC_APP_URL or APP_URL. Add the app URL before creating checkout sessions.');
}

export function getStripeWebhookSecret() {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error('Missing STRIPE_WEBHOOK_SECRET. Add it to your environment before enabling webhooks.');
  }

  return webhookSecret;
}
