import { checkoutPlans, getCheckoutPlan, type CheckoutTier } from '@/lib/stripe';

// Checkout is gated OFF by default. MileHiIV's product flows (account, upload,
// dashboard, report) are not yet wired end-to-end, so we do not take payment.
// Re-enable by setting CHECKOUT_ENABLED=true once the core loop works.
const CHECKOUT_ENABLED = process.env.CHECKOUT_ENABLED === 'true';

function CheckoutButton({ tier, label }: { tier: CheckoutTier; label: string }) {
  if (!CHECKOUT_ENABLED) {
    return (
      <button type="button" className="btn btn-primary mt-sm" disabled aria-disabled="true">
        Coming soon
      </button>
    );
  }
  return (
    <form className="checkout-form" action="/api/checkout" method="post">
      <input type="hidden" name="tier" value={tier} />
      <button type="submit" className="btn btn-primary mt-sm">
        {label} →
      </button>
    </form>
  );
}

export default async function Pricing({
  searchParams,
}: {
  searchParams?: Promise<{ checkout?: string; tier?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const checkoutState = resolvedSearchParams?.checkout;
  const selectedTier = resolvedSearchParams?.tier;
  const selectedPlan = selectedTier ? getCheckoutPlan(selectedTier) : null;

  return (
    <main>
      <section className="hero">
        <div className="container text-center">
          <h1>Simple pricing. No surprises.</h1>
          <p className="lead">
            Pay for what you use. No hidden fees. No annual contracts.
          </p>
          {checkoutState === 'success' ? (
            <div className="checkout-banner checkout-banner-success" role="status">
              Checkout completed{selectedPlan ? ` for ${selectedPlan.name}` : ''}. Your payment came through.
            </div>
          ) : null}
          {checkoutState === 'cancelled' ? (
            <div className="checkout-banner" role="status">
              Checkout was cancelled. You can try again below whenever you are ready.
            </div>
          ) : null}
          {checkoutState === 'error' ? (
            <div className="checkout-banner" role="status">
              Checkout is temporarily unavailable. Please try again once Stripe is configured.
            </div>
          ) : null}
          {checkoutState === 'paused' || !CHECKOUT_ENABLED ? (
            <div className="checkout-banner" role="status">
              MileHiIV is in active development and not yet taking payments — we&apos;re finishing the
              upload, analysis, and report experience first. Check back soon.
            </div>
          ) : null}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-3" style={{ maxWidth: '1080px', margin: '0 auto' }}>
            {Object.values(checkoutPlans).map((plan) => (
              <div className="card" key={plan.key}>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <CheckoutButton tier={plan.key} label={plan.cta} />
              </div>
            ))}
          </div>
          <div className="text-center mt-md">
            <CheckoutButton tier="pay-per-report" label="Start checkout" />
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container text-center">
          <p>Early access: We&apos;re in active development. Pricing may evolve as we add features. Early users get special consideration.</p>
        </div>
      </section>
    </main>
  );
}
