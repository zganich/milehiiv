import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { getStripeWebhookSecret } from '@/lib/stripe';

export const runtime = 'nodejs';

function logCheckoutEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Stripe checkout completed', {
        sessionId: session.id,
        mode: session.mode,
        paymentStatus: session.payment_status,
        tier: session.metadata?.tier,
      });
      break;
    }
    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Stripe invoice paid', {
        invoiceId: invoice.id,
        status: invoice.status,
      });
      break;
    }
    default: {
      console.log(`Stripe event received: ${event.type}`);
    }
  }
}

export async function POST(request: Request) {
  try {
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing Stripe signature header' }, { status: 400 });
    }

    const payload = await request.text();
    const event = Stripe.webhooks.constructEvent(payload, signature, getStripeWebhookSecret());

    logCheckoutEvent(event);

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);

    if (error instanceof Stripe.errors.StripeSignatureVerificationError) {
      return NextResponse.json({ error: 'Invalid Stripe signature' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
