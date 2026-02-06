'use client';

export default function UploadZone() {
  return (
    <div className="upload-zone">
      <h3>Upload your trip history</h3>
      <p>Drag & drop CSV or PDF files from Uber, Lyft, or DoorDash — or click to browse</p>
      <input type="file" accept=".csv,.pdf" />
    </div>
  );
}
