import Sidebar from '@/components/Sidebar';
import StatCard from '@/components/StatCard';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div className="app-shell">
      <Sidebar active="dashboard" />
      <main className="main-content">
        <div className="page-header">
          <h1>Dashboard</h1>
          <Link href="/upload" className="btn btn-primary">Upload Data</Link>
        </div>
        <div className="stats-grid">
          <StatCard label="Total Miles Found" value="14,320" />
          <StatCard label="Deadhead Miles" value="3,180" />
          <StatCard label="Reports Generated" value="6" />
        </div>
      </main>
    </div>
  );
}
