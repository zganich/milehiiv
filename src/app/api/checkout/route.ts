import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

const checkoutPlans = {
  'pay-per-report': 'Pay-per-report checkout',
  monthly: 'Monthly checkout',
} as const;

export async function POST(request: Request) {
  const formData = await request.formData();
  const tier = String(formData.get('tier') ?? 'pay-per-report');
  const planName = checkoutPlans[tier as keyof typeof checkoutPlans];

  if (!planName) {
    return NextResponse.redirect(new URL('/pricing?checkout=cancelled', request.url), 303);
  }

  const origin = request.headers.get('origin') ?? new URL(request.url).origin;
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          unit_amount: 100,
          product_data: {
            name: `MileHiiv ${planName}`,
          },
        },
      },
    ],
    success_url: `${origin}/pricing?checkout=success&tier=${encodeURIComponent(tier)}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/pricing?checkout=cancelled&tier=${encodeURIComponent(tier)}`,
    metadata: {
      tier,
      source: 'pricing-page',
    },
  });

  return NextResponse.redirect(session.url!, 303);
}
