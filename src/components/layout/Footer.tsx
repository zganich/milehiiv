import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-background-secondary">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-base font-semibold text-foreground">MileHiiv</span>
            </Link>
            <p className="text-sm text-foreground-muted leading-relaxed">
              Find the miles your apps don&apos;t track. Generate IRS-ready mileage reports.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/how-it-works" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Drivers Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">For Drivers</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/drivers" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  All Drivers
                </Link>
              </li>
              <li>
                <Link href="/uber-mileage" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Uber Drivers
                </Link>
              </li>
              <li>
                <Link href="/lyft-mileage" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Lyft Drivers
                </Link>
              </li>
              <li>
                <Link href="/audit-help" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Audit Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/privacy" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-foreground-muted hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-foreground-subtle">
            © 2026 MileHiiv. All rights reserved.
          </p>
          <p className="text-xs text-foreground-subtle">
            No GPS tracking • No bank access • Your data stays private
          </p>
        </div>
      </div>
    </footer>
  );
}
