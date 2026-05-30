import { NextResponse } from 'next/server';
import {
  getAppUrl,
  getCheckoutPlan,
  getCheckoutPriceId,
  getStripe,
} from '@/lib/stripe';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const tier = String(formData.get('tier') ?? 'pay-per-report');
    const plan = getCheckoutPlan(tier);

    if (!plan) {
      return NextResponse.redirect(new URL('/pricing?checkout=cancelled', request.url), 303);
    }

    const stripe = getStripe();
    const appUrl = getAppUrl(request);
    const priceId = getCheckoutPriceId(plan.key);

    const session = await stripe.checkout.sessions.create({
      mode: plan.mode,
      line_items: [
        {
          quantity: 1,
          price: priceId,
        },
      ],
      success_url: `${appUrl}/pricing?checkout=success&tier=${encodeURIComponent(tier)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?checkout=cancelled&tier=${encodeURIComponent(tier)}`,
      metadata: {
        tier,
        source: 'pricing-page',
      },
    });

    if (!session.url) {
      throw new Error('Stripe checkout session did not return a URL.');
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error('Checkout session creation failed:', error);
    return NextResponse.redirect(new URL('/pricing?checkout=error', request.url), 303);
  }
}
