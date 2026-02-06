import Link from 'next/link';

export default function UberMileage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Uber doesn&apos;t count all your miles. We do.</h1>
              <p>
                Uber only tracks miles during active trips. Deadhead, repositioning, and gaps between rides add up — and they&apos;re all deductible. MileHiiv finds what Uber misses and turns it into IRS-ready reports.
              </p>
              <div className="hero-ctas">
                <Link href="/upload" className="btn btn-primary">Upload your Uber history</Link>
              </div>
            </div>
            <div className="hero-visual">
              <img src="/report-preview.svg" alt="Report preview" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container text-center">
          <p>Export your trip history from the Uber Driver app. We handle the rest.</p>
          <Link href="/how-it-works" className="btn btn-secondary mt-md">See how it works</Link>
        </div>
      </section>
    </main>
  );
}
