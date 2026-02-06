import Link from 'next/link';

export default function Reports() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Reports you can file with confidence</h1>
          <p className="lead">
            Every MileHiiv report is built for IRS documentation standards — annotated, CPA-ready, and compatible with TurboTax and H&R Block.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="split">
            <div className="report-preview-block">
              <img src="/report-preview.svg" alt="Sample IRS-ready report" />
            </div>
            <div className="split-content">
              <h2>What&apos;s in every report</h2>
              <ul className="report-benefits">
                <li>Categorized mileage by trip type (on-trip, deadhead, repositioning)</li>
                <li>Clear totals and date ranges</li>
                <li>Field explanations in plain English</li>
                <li>CPA-friendly formatting</li>
                <li>TurboTax and H&R Block compatibility</li>
              </ul>
              <p>No guessing. No spreadsheets. Just documentation you can stand behind.</p>
              <Link href="/upload" className="btn btn-primary mt-md">Download a sample PDF →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-muted">
        <div className="container text-center">
          <h2>Ready to generate your report?</h2>
          <p>Upload your trip history and we&apos;ll build an audit-ready report in minutes.</p>
          <Link href="/upload" className="btn btn-primary mt-md">Upload your file →</Link>
        </div>
      </section>
    </main>
  );
}
