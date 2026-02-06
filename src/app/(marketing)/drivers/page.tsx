import Link from 'next/link';

export default function Drivers() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Built for drivers who take this seriously</h1>
          <p className="lead">
            MileHiiv is designed for gig drivers who care about accuracy, deductions, and audit readiness — across every platform you drive.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>Uber drivers</h3>
              <p>Export your trip history from the Uber Driver app. We find the deadhead and gap miles Uber doesn&apos;t count — and turn them into IRS-ready documentation.</p>
              <Link href="/uber-mileage" className="btn btn-secondary mt-sm">Uber mileage →</Link>
            </div>
            <div className="card">
              <h3>Lyft drivers</h3>
              <p>Same story for Lyft. We analyze your Lyft CSV export to uncover missed miles and generate reports you can file with confidence.</p>
              <Link href="/lyft-mileage" className="btn btn-secondary mt-sm">Lyft mileage →</Link>
            </div>
            <div className="card">
              <h3>DoorDash drivers</h3>
              <p>Whether you use Stride, manual logs, or DoorDash exports — we help you capture every deductible mile and stay compliant.</p>
              <Link href="/upload" className="btn btn-secondary mt-sm">Upload your data →</Link>
            </div>
            <div className="card">
              <h3>Multi-app workflows</h3>
              <p>Drive for Uber, Lyft, and DoorDash? Combine all your trip data in one place. One report. One filing. No guesswork.</p>
              <Link href="/upload" className="btn btn-secondary mt-sm">Start with your platform →</Link>
            </div>
          </div>
          <div className="text-center mt-md">
            <Link href="/upload" className="btn btn-primary">Start with your platform →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
