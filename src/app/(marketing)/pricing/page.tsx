import Link from 'next/link';

export default function Pricing() {
  return (
    <main>
      <section className="hero">
        <div className="container text-center">
          <h1>Simple pricing. No surprises.</h1>
          <p className="lead">
            Pay for what you use. No hidden fees. No annual contracts.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-2" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="card">
              <h3>Pay-per-report</h3>
              <p>Generate reports as you need them. Perfect for drivers who want flexibility and control.</p>
              <Link href="/upload" className="btn btn-secondary mt-sm">Get started →</Link>
            </div>
            <div className="card">
              <h3>Monthly</h3>
              <p>Power users who generate reports regularly. Unlimited reports. One predictable price.</p>
              <Link href="/upload" className="btn btn-secondary mt-sm">Get started →</Link>
            </div>
          </div>
          <div className="text-center mt-md">
            <Link href="/upload" className="btn btn-primary">Get started →</Link>
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
