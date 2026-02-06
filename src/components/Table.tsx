export default function Table() {
  const reports = [
    { name: 'January 2025', date: '02/01/25', miles: '2,430', status: 'Ready' },
    { name: 'December 2024', date: '01/01/25', miles: '2,890', status: 'Ready' },
    { name: 'November 2024', date: '12/01/24', miles: '2,150', status: 'Ready' },
  ];

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Report</th>
            <th>Date</th>
            <th>Miles</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r, i) => (
            <tr key={i}>
              <td>{r.name}</td>
              <td>{r.date}</td>
              <td>{r.miles}</td>
              <td><span className="badge badge-success">{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
