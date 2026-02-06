import Link from 'next/link';

export default function Security() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Your data stays yours</h1>
          <p className="lead">
            We take security and privacy seriously. No gimmicks. No resale. No surprises.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h3>Encryption</h3>
              <p>All data is encrypted in transit and at rest using industry-standard AES-256. Your files and reports are protected at every step.</p>
            </div>
            <div className="card">
              <h3>No resale</h3>
              <p>We never sell, share, or monetize your driving data. Period. Your mileage information is yours alone.</p>
            </div>
            <div className="card">
              <h3>Delete anytime</h3>
              <p>Request deletion of all your data at any time. We&apos;ll remove it within 24 hours. No questions, no retention.</p>
            </div>
            <div className="card">
              <h3>Compliance</h3>
              <p>Built with IRS documentation standards in mind. Plain-English compliance language. Your reports are audit-ready and defensible.</p>
            </div>
          </div>
          <div className="text-center mt-md">
            <Link href="/upload" className="btn btn-primary">Upload safely →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
