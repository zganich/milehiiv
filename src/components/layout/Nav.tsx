'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

interface NavProps {
  showAuth?: boolean;
  showDashboardNav?: boolean;
}

export function Nav({ showAuth = true, showDashboardNav = false }: NavProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const publicLinks = [
    { href: '/tax-strategy', label: 'Tax Strategy' },
    { href: '/already-filed', label: 'Already Filed?' },
    { href: '/pricing', label: 'Pricing' }
  ];

  const dashboardLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/import', label: 'Import' }
  ];

  const links = showDashboardNav ? dashboardLinks : publicLinks;

  return (
    <nav className="nav">
      <div className="container">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-foreground">MileHiiv</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'nav-link',
                  pathname === link.href && 'nav-link-active'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          {showAuth && (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get started</Button>
              </Link>
            </div>
          )}

          {showDashboardNav && (
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="sm">Profile</Button>
              <Button variant="ghost" size="sm">Sign out</Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2 text-foreground-muted hover:text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'nav-link py-3',
                    pathname === link.href && 'nav-link-active'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              {showAuth && (
                <>
                  <hr className="divider my-2" />
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <span className="nav-link py-3 w-full">Sign in</span>
                  </Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full mt-2">Get started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
