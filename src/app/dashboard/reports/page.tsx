import Sidebar from '@/components/Sidebar';
import Table from '@/components/Table';

export default function DashboardReports() {
  return (
    <div className="app-shell">
      <Sidebar active="reports" />
      <main className="main-content">
        <h1>Reports</h1>
        <Table />
      </main>
    </div>
  );
}
