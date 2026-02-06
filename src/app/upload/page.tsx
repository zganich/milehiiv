import Sidebar from '@/components/Sidebar';
import UploadZone from '@/components/UploadZone';

export default function Upload() {
  return (
    <div className="app-shell">
      <Sidebar active="upload" />
      <main className="main-content">
        <h1>Upload Your Trip History</h1>
        <UploadZone />
      </main>
    </div>
  );
}
