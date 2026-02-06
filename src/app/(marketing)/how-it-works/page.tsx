import Link from 'next/link';

export default function HowItWorks() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>How MileHiiv works</h1>
          <p className="lead">
            MileHiiv works with the data you already have — nothing more.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>What data we use</h3>
              <p>We analyze trip exports from Uber, Lyft, DoorDash, and Stride. CSV files, timeline exports, or mileage tracker data — whatever you already have.</p>
            </div>
            <div className="card">
              <h3>What we don&apos;t access</h3>
              <p>No bank access. No GPS tracking. No connection to your ride-share accounts. You upload files manually; we never touch your credentials.</p>
            </div>
            <div className="card">
              <h3>How analysis works</h3>
              <p>Our system identifies deadhead miles, gaps between trips, and underreported distance your apps ignore. We reconcile everything into a single audit-ready view.</p>
            </div>
            <div className="card">
              <h3>What reports include</h3>
              <p>Categorized mileage, clear totals, and formatting compatible with Schedule C, TurboTax, and CPA workflows. Plain-English summaries you can stand behind.</p>
            </div>
          </div>
          <div className="text-center mt-md">
            <Link href="/upload" className="btn btn-primary">Upload your file →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
