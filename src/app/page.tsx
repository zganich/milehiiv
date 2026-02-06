import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Find the miles your apps don't track.</h1>
            <p>
              MileHiiv analyzes your driving data to uncover missed and deadhead miles — then generates clean, IRS-ready reports in minutes.
            </p>
            <div className="hero-ctas">
              <Link href="/upload" className="btn btn-primary">Upload your driving data</Link>
              <Link href="/dashboard" className="btn btn-secondary">See how it works</Link>
            </div>
            <p className="trust-line">No GPS tracking • No bank access • Delete your data anytime</p>
          </div>
          <div className="hero-visual">
            <img src="/report-preview.svg" alt="Report preview" />
          </div>
        </div>
      </section>
    </main>
  );
}
