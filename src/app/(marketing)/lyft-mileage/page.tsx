import Link from 'next/link';

export default function LyftMileage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Deadhead miles add up fast.</h1>
              <p>
                Miles to pickup, between rides, and home at the end of the shift — Lyft doesn&apos;t count them. But the IRS does. MileHiiv finds every deductible mile and builds reports you can file with confidence.
              </p>
              <div className="hero-ctas">
                <Link href="/upload" className="btn btn-primary">Find yours →</Link>
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
          <p>Upload your Lyft trip export. We&apos;ll show you what you&apos;re missing.</p>
          <Link href="/how-it-works" className="btn btn-secondary mt-md">See how it works</Link>
        </div>
      </section>
    </main>
  );
}
