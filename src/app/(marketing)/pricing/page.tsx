const checkoutPlans = [
  {
    key: 'pay-per-report',
    name: 'Pay-per-report',
    description: 'Generate reports as you need them. Perfect for drivers who want flexibility and control.',
    cta: 'Start checkout',
  },
  {
    key: 'monthly',
    name: 'Monthly',
    description: 'Power users who generate reports regularly. Unlimited reports. One predictable price.',
    cta: 'Start checkout',
  },
] as const;

function CheckoutButton({ tier, label }: { tier: string; label: string }) {
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
              Checkout completed{selectedTier ? ` for ${selectedTier}` : ''}. Your test payment came through.
            </div>
          ) : null}
          {checkoutState === 'cancelled' ? (
            <div className="checkout-banner" role="status">
              Checkout was cancelled. You can try again below whenever you are ready.
            </div>
          ) : null}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-3" style={{ maxWidth: '1080px', margin: '0 auto' }}>
            {checkoutPlans.map((plan) => (
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
