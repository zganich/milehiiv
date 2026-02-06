'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/how-it-works', label: 'How it works' },
    { href: '/drivers', label: 'Drivers' },
    { href: '/reports', label: 'Reports' },
    { href: '/security', label: 'Security' },
    { href: '/pricing', label: 'Pricing' },
  ];

  return (
    <header className="marketing-header">
      <div className="container header-inner">
        <Link href="/" className="header-logo">
          <img src="/logo.svg" alt="MileHiiv" />
        </Link>
        <nav className={`header-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/upload" className="btn btn-primary">Upload your driving data</Link>
        </div>
        <button
          type="button"
          className="header-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
