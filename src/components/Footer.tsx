import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/upload">Upload Data</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/reports">Reports</Link>
            <Link href="/how-it-works">How it works</Link>
          </div>
          <div className="footer-col">
            <h4>Drivers</h4>
            <Link href="/uber-mileage">Uber Drivers</Link>
            <Link href="/lyft-mileage">Lyft Drivers</Link>
            <Link href="/upload">DoorDash Drivers</Link>
            <Link href="/drivers">Is MileHiiv right for me?</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/security">Security</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/audit-help">Audit help</Link>
          </div>
          <div className="footer-col">
            <p>© 2026 MileHiiv</p>
            <p>Find the miles your apps don&apos;t track.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
