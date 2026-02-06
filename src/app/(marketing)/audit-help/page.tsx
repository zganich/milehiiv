import Link from 'next/link';

export default function AuditHelp() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Filing or being audited? Don&apos;t guess.</h1>
              <p>
                When the IRS asks for documentation, you need more than estimates. MileHiiv generates audit-ready reports with categorized mileage, clear totals, and formatting that CPAs and tax pros expect.
              </p>
              <div className="hero-ctas">
                <Link href="/upload" className="btn btn-primary">Generate audit-ready reports →</Link>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/report-preview.svg" alt="Report preview" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container">
          <h2>What auditors want to see</h2>
          <ul className="report-benefits">
            <li>Categorized mileage (on-trip, deadhead, repositioning)</li>
            <li>Date ranges and clear totals</li>
            <li>Documentation that traces back to source data</li>
            <li>CPA-friendly formatting compatible with TurboTax and Schedule C</li>
          </ul>
          <Link href="/upload" className="btn btn-secondary mt-md">Upload your data →</Link>
        </div>
      </section>
    </main>
  );
}
