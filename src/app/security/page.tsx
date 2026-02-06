import Sidebar from '@/components/Sidebar';

export default function Security() {
  return (
    <div className="app-shell">
      <Sidebar active="security" />
      <main className="main-content">
        <h1>Your data stays yours.</h1>
        <div style={{ maxWidth: '600px' }}>
          <h3>Encryption</h3>
          <p>All data is encrypted in transit and at rest using industry-standard AES-256.</p>
          
          <h3>No Resale</h3>
          <p>We never sell, share, or monetize your driving data. Period.</p>
          
          <h3>Delete Anytime</h3>
          <p>Request deletion of all your data at any time. We'll remove it within 24 hours.</p>
          
          <h3>Compliance</h3>
          <p>Built with IRS documentation standards in mind. Your reports are audit-ready.</p>
        </div>
      </main>
    </div>
  );
}
