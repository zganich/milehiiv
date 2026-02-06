import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Find the miles your apps don&apos;t track.</h1>
              <p>
                MileHiiv analyzes your driving data to uncover missed and deadhead miles — then generates clean, IRS-ready reports in minutes.
              </p>
              <div className="hero-ctas">
                <Link href="/upload" className="btn btn-primary">Upload your driving data</Link>
                <Link href="/how-it-works" className="btn btn-secondary">See how it works</Link>
              </div>
              <p className="trust-line">No GPS tracking • No bank access • Delete your data anytime</p>
            </div>
            <div className="hero-visual">
              <img src="/report-preview.svg" alt="Report preview" />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="trust-section">
        <div className="container text-center">
          <p className="trust-label">Built for real gig drivers. Works with real driving data.</p>
          <div className="logos">
            <span className="logo-placeholder">Uber</span>
            <span className="logo-placeholder">Lyft</span>
            <span className="logo-placeholder">DoorDash</span>
            <span className="logo-placeholder">Instacart</span>
          </div>
          <p className="trust-caption">Supports data from</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section>
        <div className="container">
          <h2 className="text-center">How it works</h2>
          <div className="grid grid-3">
            <div className="card step-card">
              <div className="step-number">1</div>
              <h3>Upload your trip history</h3>
              <p>Import a CSV from Uber, Lyft, DoorDash, or your mileage tracker.</p>
            </div>
            <div className="card step-card">
              <div className="step-number">2</div>
              <h3>We find what&apos;s missing</h3>
              <p>MileHiiv identifies deadhead miles, gaps, and underreported distance your apps ignore.</p>
            </div>
            <div className="card step-card">
              <div className="step-number">3</div>
              <h3>Download IRS-ready reports</h3>
              <p>Clean summaries compatible with Schedule C, TurboTax, and CPA workflows.</p>
            </div>
          </div>
          <div className="text-center mt-md">
            <Link href="/upload" className="btn btn-primary">Try it with your data →</Link>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className="section-muted">
        <div className="container">
          <div className="split">
            <div className="split-content">
              <h2>Why it matters</h2>
              <p><strong>The problem:</strong> Most mileage tools only track miles during active trips. That leaves repositioning, deadhead, and app gaps uncounted — which means less deduction and more risk.</p>
              <p className="mt-sm"><strong>The solution:</strong> MileHiiv closes those gaps and gives you documentation you can actually stand behind.</p>
              <Link href="/upload" className="btn btn-secondary mt-md">See what you&apos;re missing →</Link>
            </div>
            <div className="hero-visual">
              <img src="/report-preview.svg" alt="Report preview" />
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section>
        <div className="container">
          <h2 className="text-center">Who it&apos;s for</h2>
          <div className="grid grid-4">
            <div className="card">
              <h3>Full-time gig drivers</h3>
              <p>Maximize your deductions when driving is your main income.</p>
            </div>
            <div className="card">
              <h3>Multi-app drivers</h3>
              <p>Track miles across Uber, Lyft, DoorDash, and more in one place.</p>
            </div>
            <div className="card">
              <h3>Drivers filing Schedule C</h3>
              <p>Get documentation that holds up at tax time.</p>
            </div>
            <div className="card">
              <h3>Drivers who care about audit readiness</h3>
              <p>Reports built with IRS standards in mind.</p>
            </div>
          </div>
          <div className="text-center mt-md">
            <Link href="/drivers" className="btn btn-secondary">Is MileHiiv right for me?</Link>
          </div>
        </div>
      </section>

      {/* SAMPLE OUTPUT */}
      <section className="section-muted">
        <div className="container">
          <div className="split">
            <div className="report-preview-block">
              <img src="/report-preview.svg" alt="Sample report" />
            </div>
            <div className="split-content">
              <h2>Know exactly what you&apos;re filing</h2>
              <ul className="report-benefits">
                <li>Categorized mileage</li>
                <li>Clear totals</li>
                <li>Audit-friendly formatting</li>
                <li>CPA-ready exports</li>
              </ul>
              <Link href="/reports" className="btn btn-secondary mt-md">Download a sample report →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="container">
          <div className="cta-section">
            <h2>Don&apos;t guess your mileage. Prove it.</h2>
            <div className="hero-ctas">
              <Link href="/upload" className="btn btn-primary">Upload your driving data</Link>
              <Link href="/reports" className="btn btn-secondary">Preview a sample report</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
