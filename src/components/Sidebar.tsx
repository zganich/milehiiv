import Link from 'next/link';

export default function Sidebar({ active }: { active?: string }) {
  const links = [
    { href: '/dashboard', label: 'Dashboard', key: 'dashboard' },
    { href: '/upload', label: 'Upload', key: 'upload' },
    { href: '/reports', label: 'Reports', key: 'reports' },
    { href: '/security', label: 'Security', key: 'security' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">MileHiiv</div>
      <nav className="sidebar-nav">
        {links.map(link => (
          <Link 
            key={link.key} 
            href={link.href} 
            className={active === link.key ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
